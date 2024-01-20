const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password: secPassword,
      phone_number: req.body.phone_number
    });

    const createdUser = await user.save();

    const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);

    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + 86400000),
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .status(201)
      .json({ success: true, message: "process successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.body;
    const userData = await User.findOne({ email: user.email });

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "sign in with correct credentials" });
    } else {
      const match = await bcrypt.compare(user.password, userData.password);

      if (match) {
        const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET);

        return res
          .cookie("token", token, {
            expires: new Date(Date.now() + 86400000),
            sameSite: "none",
            httpOnly: true,
            secure: true,
          })
          .status(200)
          .json({ success: true, message: "process successful" });
      } else {
        return res.status(400).json({
          success: false,
          message: "sign in with correct credentials",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};
