require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const http = require('http');
const socketIo = require('socket.io');
const Order = require("./models/Order");
const logger = require("./logger");

const userRouter = require("./routes/userRouterV1");
const shopRouter = require("./routes/shopRouterV1");
const customerRouter = require("./routes/customerRouterV1");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  logger.info("New socket connection");

  socket.on('shopJoin', shopId => {
      logger.info(`Shop joined with ID: ${shopId}`);
      socket.join(shopId);
  });

  socket.on('customerJoin', customerId => {
      logger.info(`Customer joined with ID: ${customerId}`);
      socket.join(customerId);
  });

  socket.on('placeOrder', async ({ shopId, order }) => {
      logger.info(`New order placed for shop with ID: ${shopId}`);
      const room = io.sockets.adapter.rooms.get(shopId);
      if(room){
        const createdOrder = await (new Order(order)).save();
        const response = await Order.findById({
          _id: createdOrder._id,
        }).populate({
          path: 'customer_id',
          select: 'name phone_number'
        }).sort({ updatedAt: -1 });
        io.to(shopId.toString()).emit('newOrder', response);
      }
      else{
        order.status = "Declined";
        const createdOrder = await (new Order(order)).save();
        io.to((order.customer_id).toString()).emit('orderDeclined',createdOrder._id);
      }
  });

  socket.on('acceptOrder', async ({ customerId, orderId }) => {
    await Order.findByIdAndUpdate({_id:orderId},{status:"Accepted"});
    io.to(customerId.toString()).emit('orderAccepted', orderId);
  });

  socket.on('declineOrder', async ({ customerId, orderId }) => {
    await Order.findByIdAndUpdate({_id:orderId},{status:"Declined"});
    io.to(customerId.toString()).emit('orderDeclined', orderId);
  });

  socket.on('deliverOrder', async ({ customerId, orderId }) => {
    await Order.findByIdAndUpdate({_id:orderId},{status:"Delivered"}); 
    io.to(customerId.toString()).emit('orderDelivered', orderId);
  });

  socket.on('disconnect', () => {
    logger.info('Socket disconnected');
});
});

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "campusFoodDeliveryService",
  })
  .then(() => {
    logger.info("Connected to the database");
  })
  .catch((error) => logger.error(error));

app.use(cors());

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/customer", customerRouter);

server.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
