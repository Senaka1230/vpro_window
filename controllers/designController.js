
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = mongoose.model("Users");
const RightMenus = mongoose.model("RightMenus");
const moment = require("moment");

require("dotenv").config({ path: ".variables.env" });

exports.saveRightNenu = async (req, res) => {
  try {
    const {canvas, scale, createria} = req.body;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await RightMenus.deleteMany();

    for(var k = 0; k < canvas.length ; k++){

      const newInfo = new RightMenus({
        canvas:canvas[k], scale:scale[k], createria:createria[k]
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

    var canvasMenu = [], scale = [], createria=[];

    const rightMenus = await RightMenus.find();

    for(const rightMenu of rightMenus){
      canvasMenu.push(rightMenu.canvas);
      scale.push(rightMenu.scale);
      createria.push(rightMenu.createria);
    }

    res.status(200).json({ success: true, canvasMenu, scale, createria});

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



// exports.getTopAgents = async (req, res) => {
//   try {


//    const agents = await Users.find({role:"agent"}).lean();

//    for(var k=0; k< agents.length; k++)
//    {
//      const properties = await Properties.find({agentId:agents[k]._id});
//      agents[k]["propertyNum"] = properties.length;
//    }
//    const middleAgents = agents.sort((a, b) => {
//     return b.propertyNum - a.propertyNum;
//    });
//    const finalAgents = middleAgents.slice(0, 5);


//       return res.status(200).json({
//         finalAgents
//       });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


// exports.saveContactInfo = async (req, res) => {
//   try {

//     const {location, email, phone} = req.body;

//     const before = await ContactInfo.find();

//     if(before.length == 0)
//     {
//       const newInfo = new ContactInfo({
//         location, email, phone
//       });
//       await newInfo.save();
//     }
//     else{
//       await ContactInfo.findOneAndUpdate(
//         { _id: before[0]._id },
//         {
//           location, email, phone
//         },
//         { new: true }
//       );
//     }

//     res.status(200).json({ success: true });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// exports.saveAccountChange = async (req, res) => {
//   try {

//     const {userId, email, fullName} = req.body;

//       await Users.findOneAndUpdate(
//         { _id: userId },
//         {
//           fullName, email
//         },
//         { new: true }
//       );

//     res.status(200).json({ success: true });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// exports.DeleteOneAgent = async (req, res) => {
//   try {

//     const id = req.body.id;
//      await Users.findOneAndDelete({_id:id});
//     res.status(200).json({ success: true });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


// exports.agentEditPassword = async (req, res) => {
//   try {

//     const {userId, newPassword} = req.body;

//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash(newPassword, salt);

//     await Users.findOneAndUpdate(
//       { _id: userId },
//       {
//        password:passwordHash
//       },
//       { new: true }
//     );

//     res.status(200).json({ success: true });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// exports.createAnAgent = async (req, res) => {
//   try {

//     const {fullName, email, phone, officeLocation, officePhone, bio, officeName, description} = req.body;

//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash('12345', salt);

//     const newUser = new Users({
//       fullName, email, phone, agentOfficLocaton:officeLocation, agentOfficPhone:officePhone, agentBio:bio, agentOfficName:officeName, agentDescription:description,
//       role:'agent',
//       password:passwordHash
//     });

//     await newUser.save();

//     res.status(200).json({ success: true });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };




