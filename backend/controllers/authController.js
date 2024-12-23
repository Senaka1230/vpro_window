const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const User = mongoose.model("Users");

require("dotenv").config({ path: ".variables.env" });

exports.register = async (req, res) => {

  try {
    let { phone, password, confirmPassword, invitation } = req.body;


    if (!phone || !password || !confirmPassword)
      return res.status(400).json({ message: "Not all fields have been entered." });
    // if (password.length < 5)
    //   return res
    //     .status(400)
    //     .json({ success:false, message: "The password needs to be at least 5 characters long." });
    // if (password !== confirmPassword)
    //   return res
    //     .status(200)
    //     .json({ message: "Password confirm isn't correct." });

    const existingUser = await User.findOne({ phone: phone });
    
    if (existingUser)
      return res
        .status(200)
        .json({ success:false, message: "An user with this phone number already exists." });

    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);
  

        const newUser = new User({
          phone : phone,
          password: passwordHash,
        });
    
         await newUser.save();
         const me = await User.findOne({phone : phone});


    return res.status(200).json({
      success: true,
      message:"Registered successfully! Please login again."
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {

  try {
    const { email, password} = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ message: "Not all fields have been entered." });

    if (password.length < 5)
      return res
        .status(400)
        .json({ success:false, message: "The password needs to be at least 5 characters long." });


    var users = await User.findOne({ email: email})
  

    if (!users)
      return res.status(400).json({
        message: "No account with this email has been registered.",
      });

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid password.",
      });

      const accessToken = jwt.sign(
        { id: users._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
      );

      return res.status(200).json({
        accessToken:accessToken,
        user:users
       });
  } catch (err) {
     res.status(500).json({message: err.message });
  }
};

exports.loginAdmin = async (req, res) => {

  try {
    const { phone, password } = req.body;

    // validate
    if (!phone || !password)
      return res.status(400).json({ message: "Please check your phone number and password." });

    const users = await User.findOne({ phone: phone, role : "admin" });
    if (!users)
      return res.status(400).json({
        message: "This phone number is not admin.",
      });

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid password.",
      });

      const accessToken = jwt.sign(
        { id: users._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
      );

      return res.status(200).json({
        accessToken:accessToken,
        user:users
       });
  } catch (err) {
     res.status(500).json({message: err.message });
  }
};


exports.isValidToken = async (req, res) => {
  try {
    
    const { token } = req.body;

    if (!token)
      return res.status(401).json({
        message: 'Authorization token missing',
      });

      const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res.status(401).json({
        message: "Token verification failed, authorization denied.",
      });

    const user = await User.findOne({ _id: verified.id });
    if (!user)
      return res.status(401).json({
        message: "User doens't Exist, authorization denied.",
      });

      return res.status(200).json({user:user});
      
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// exports.logout = async (req, res) => {
//   const result = await Admin.findOneAndUpdate(
//     { _id: req.admin._id },
//     { isLoggedIn: false },
//     {
//       new: true,
//     }
//   ).exec();

//   res.status(200).json({ isLoggedIn: result.isLoggedIn });
// };


