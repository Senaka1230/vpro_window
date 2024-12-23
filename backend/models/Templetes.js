const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const templeteSchema = new mongoose.Schema({
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
  selectedType: {
    type: String,
    required:true
  },
  width: {
    type: Number,
    default:500
  },
  height: {
    type: Number,
    default:500
  },

 updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Templetes", templeteSchema);
