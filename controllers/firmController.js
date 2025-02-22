const Firm = require('../models/Firm');
const Vendor = require("../models/Vendor");
const multer = require('multer');

// -- Adding Images
    // Multer package - dwara Image ni Database lo save cheyochu 
    // install Multer package - "npm install multer"
    //"const multer = require('multer');"
    // oka standard format to Images ni save chestam
    // Create a uploads folder - Destination folder - where the uploaded images will be stored
    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'uploads/'); // Destination folder - where the uploaded images will be stored
        },
        filename: function(req,file,cb){
            cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
        }
    });
const upload = multer({storage: storage});

const addFirm = async (req,res) => {
    try {
        //body nunchi vastunna properties, anduke - "req.body"
        const {firmName, area, category, region, offer} = req.body;

        //Image - remaining properties to separate ga vastundi kabati
        const image = req.file? req.file.filename: undefined;

        // vendorId kuda kavali - enduku antey vendor ID base meda Firm ni Vendor ki add chestunam ga
        const vendor = await Vendor.findById(req.vendorId);

        //Incase vendor fail ithey 
        if(!vendor){
            res.status(404).json({message:"Vendor not found"});
        } 
        if(vendor.firmlength > 0){
            return res.status(400).json({message:"Vendor can have only one firm"});
        }
        //oka Instance dwara e properties nunchi vastunna values ni, records/Database lo save chestam
        const firm = new Firm({
           firmName, 
           area, 
           category, 
           region, 
           offer, 
           image, 
           vendor: vendor._id
           //Firm.js lo - vendor property kuda undi - So, (in behalf of vendor property value) - we are passing vendorId
        });
        // Save this Instance
       const savedFirm = await firm.save(); //Manam create cheshina firm ni "savedFirm" loki assign chesham
       //Save iyaka, response chupiyaniki oka promise kavali - So edi anta try-catch block lo chestam
       
       //vendor table lo - firm property loki - e savedFirm dwara, manam create cheshina firm(firm record values) ni push chestam(by push method)
       vendor.firm.push(savedFirm); 
       //Create a new firm and We can see now in vendors Table(Database lo) a value is added to firm property

       //vendor lo kuda e firm record ni save cheyali
       await vendor.save();

        // Firm successfully ga add ithey
        return res.status(200).json({message:"Firm Added successfully"});

    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
};

// module.exports ={addFirm};
module.exports = { addFirm: [upload.single('image'),addFirm]};
// Image unte ela export cheyali