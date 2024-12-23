const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const multer = require('multer');
const {v4} = require('uuid');
const router = express.Router();
const Design = require('../controllers/designController');
const path = require('path');

  //    ----------------file uploads ----------------
  const setEditImageMiddleware = (req, res, next) => {
    req.uploadPath = req.headers['x-origin-url'];
    const uploadDirectory = path.join(__dirname, '..', req.uploadPath);
    
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true }); 
    }
    next();
  };

const storageForEditImage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const uploadPath = req.body.originURL || 'public/uploads/';
        cb(null, req.uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, v4() + '-' + fileName)
    }
});

var uploadForEditImage = multer({ storage: storageForEditImage});


//_______________________________ Customer page routers_______________________________
router.route("/design/rightMenu/save").post(catchErrors(Design.saveRightNenu));
router.route("/design/rightMenu/getAll").get(catchErrors(Design.getAllRightNenu));
router.route("/templete/save").post(catchErrors(Design.saveOneTemplete));
router.route("/templete/getAll").get(catchErrors(Design.getAllTemplets));
router.route("/templete/get/one").post(catchErrors(Design.getOneTemplete));
router.route("/templete/delete/one").post(catchErrors(Design.deleteOneTemplete));

module.exports = router;
