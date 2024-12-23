const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const bcrypt = require("bcryptjs");


const usersSchema = new Schema({
  email: {
    type: String,
    required :true
  },
  password: {
    type: String,
    default: "12345"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role : {
    type : String,
    default : "customer"
  },
  agentOfficName:{
    type:String,
    default:""
  },
  agentOfficLocaton:{
    type:String,
    default:""
  },
  agentOfficPhone:{
    type:String,
    default:""
  },
  agentDescription:{
    type:String,
    default:""
  },
  agentBio:{
    type:String,
    default:""
  },
  phone:{
    type:String,
    default:""
  },
  interviewDate:[
    {
      date:{type:String, default:""},
    }
  ],
  avatar:{
    type:String,
    default:"/static/defaultAvatar/avatar.png"
  },
  fullName:{
    type:String,
    default:""
  }
});

// generating a hash
usersSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

// checking if password is valid
usersSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Users", usersSchema);
