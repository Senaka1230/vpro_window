
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = mongoose.model("Users");
const RightMenus = mongoose.model("RightMenus");
const Templetes = mongoose.model("Templetes");
const moment = require("moment");

require("dotenv").config({ path: ".variables.env" });

exports.saveRightNenu = async (req, res) => {
  try {
    const {canvas, scale, createria, width, height} = req.body;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await RightMenus.deleteMany();

    for(var k = 0; k < canvas.length ; k++){

      const newInfo = new RightMenus({
        canvas:canvas[k], scale:scale[k], createria:createria[k], width:width[k], height:height[k]
      });
      await newInfo.save();
      await delay(100);
    }
      // const newInfo = new RightMenus({
      //   canvas:canvas, scale:scale, createria:createria
      // });
      // await newInfo.save();


    res.status(200).json({ success: true });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllRightNenu = async (req, res) => {
  try {

    var canvasMenu = [], scale = [], createria=[], width=[], height=[];

    const rightMenus = await RightMenus.find();

    for(const rightMenu of rightMenus){
      canvasMenu.push(rightMenu.canvas);
      scale.push(rightMenu.scale);
      createria.push(rightMenu.createria);
      width.push(rightMenu.width);
      height.push(rightMenu.height);
    }

    res.status(200).json({ success: true, canvasMenu, scale, createria, width, height});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.saveOneTemplete = async (req, res) => {
  try {
    const {canvas, scale, selectedType, width, height} = req.body;

      const newInfo = new Templetes({
        canvas:canvas, scale:scale, createria:"D", selectedType, width, height
      });
      await newInfo.save();

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllTemplets = async (req, res) => {
  try {

    var canvas = [], ids = [], selectedType=[];

    const templetes = await Templetes.find();

    for(const templete of templetes){
      canvas.push(templete.canvas);
      ids.push(templete._id);
      selectedType.push(templete.selectedType);
    }

    res.status(200).json({ success: true, canvas, ids, selectedType});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getOneTemplete = async (req, res) => {
  try {
    const {id} = req.body;

    const templetes = await Templetes.findOne({_id:id});

    if(templetes)
    res.status(200).json({ success: true, canvas:templetes.canvas, scale:templetes.scale, width:templetes.width, height:templetes.height});

    else
      res.status(200).json({ success: false, message:"No data"});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteOneTemplete = async (req, res) => {
  try {
    const {id} = req.body;
    await Templetes.deleteOne({_id:id});

    res.status(200).json({ success: true});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



