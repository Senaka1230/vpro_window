const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const rightMenuSchema = new mongoose.Schema({
  canvas: {
    type: Object,
    required:true
  },
  scale: {
    type: Number,
    required:true
  },
  createria: {
    type: String,
    required:true
  },

 updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("RightMenus", rightMenuSchema);
