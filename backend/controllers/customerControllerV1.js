const FoodItem = require("../models/FoodItem");
const User = require("../models/User");
const logger = require("../logger");

exports.search = async (req, res) => {
  logger.info("Request came for search");
  try {
    const searchQuery = req.query.q || "";
    const shops = await User.find({
      $and: [
        { role: "shop" },
        { name: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .select("name")
      .exec();

    const foodItems = await FoodItem.aggregate([
      { $match: { itemName: { $regex: searchQuery, $options: "i" } } },
      { $group: { _id: "$itemName", image: { $first: "$image" } } },
    ]);

    return res.status(200).json({
      success: true,
      searchResults: [...shops, ...foodItems],
      message: "process successful",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

exports.getItemsByShopId = async (req, res) => {
  logger.info(`Request came for items of shop wiith ID = ${req.params._id}`);
  try {
    const foodItems = await FoodItem.find({ shop_id:req.params._id });
    return res
      .status(200)
      .json({
        success: true,
        foodItems: foodItems,
        message: "process successful",
      });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

exports.getShopsByItemName = async (req, res) => {
  logger.info("Request came for shops");
  try {
        const shops = await FoodItem.aggregate([
          { 
              $match: { itemName: { $regex: req.params.name, $options: "i" } }
          },
          {
              $lookup: {
                  from: "users",
                  localField: "shop_id",
                  foreignField: "_id",
                  as: "shop"
              }
          },
          {
              $unwind: "$shop"
          },
          {
              $project: {
                  _id: "$shop._id",
                  name: "$shop.name"
              }
          }
      ]);
    return res.status(200).json({
      success: true,
      shops:shops,
      message: "process successful",
    });
  } catch (error) {
    logger.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};


exports.getCartItems = async(req, res)=>{
  logger.info("Request came for cart");
  console.log("fetching cart items");
  const email=req.body.email;
  const result =await User.findOne({email:email})
  console.log(result);
  res.status(200).send('sucess')
  
   
}

let locationData = {
  customer: {},
  delivery: {}
};

exports.locationHandler = async (req, res) => {
  const { latitude, longitude, option } = req.body;

  // Update location data based on the option ("customer" or "delivery")
  if (option === 'customer' || option === 'delivery') {
    locationData[option] = { latitude, longitude };
    console.log(`Location data for ${option} updated:`, latitude, longitude);
    res.status(200).json(locationData); // Send updated location data to frontend
  } else {
    // Invalid option, respond with an error message
    res.status(400).send('Invalid option');
  }
};

exports.getLocation = async (req, res) => {
  res.status(200).json(locationData)
};

// exports.locationHandler = async(req,res)=>{
//   const { latitude, longitude, option } = req.body;
  

//   // Handle data based on the option ("customer" or "delivery")
//   if (option === 'customer') {
//     logger.info(`location thingyyyy= ${req.params.longitude}`);

//     // Handle location data for customer
//     console.log('Location data for customer:', latitude, longitude);
//     // Respond with a success message
//     res.status(200).send(`Location data for customer received `);
//   } else if (option === 'delivery') {
//     // Handle location data for delivery
//     console.log('Location data for delivery:', latitude, longitude);
//     // Respond with a success message
//     res.status(200).send(`Location data for delivery received `);
//   } else {
//     // Invalid option, respond with an error message
//     res.status(400).send('Invalid option');
//   }
// }


