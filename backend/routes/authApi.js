const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const { catchErrors } = require("../handlers/errorHandlers");
const {
  isValidToken,
  login,
  loginAdmin,
  register
} = require("../controllers/authController");

const admin = {
  email: 'diagram@company.com',
  password:"12345",
  role : "admin"
}

const init = async (initialAdmin) => {

    let {  email, role, password } = initialAdmin;

    const existingAdmin = await Users.findOne({ email: email });
    if (existingAdmin)
      return ;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Users({
      email,
      password:passwordHash,
      role
    });
    await newAdmin.save();
    return ;
};

// init(admin);
/////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

 router.route("/account/login").post(catchErrors(login));
 router.route("/admin/login").post(catchErrors(loginAdmin));
 router.route("/account/me").post(catchErrors(isValidToken));
 router.route("/account/signup").post(catchErrors(register));

module.exports = router;
