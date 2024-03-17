const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const contactInfoesSchema = new mongoose.Schema({
  location: {
    type: String,
    default:""
  },
  phone: {
    type: String,
    default:""
  },
  email: {
    type: String,
    default:""
  },

 updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("ContactInfo", contactInfoesSchema);
