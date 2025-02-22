const Product = require("../models/Product");
// Images kuda unnai kabati, Images ni import chesukoniki - multer package
const multer = require("multer");


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

// For Adding Products - we will create a "addProduct" function & add properties
const addProduct = async (req,res) => {
    // Ekkada nunchi Properties add cheyali
    try {
           const { productName, price, category, bestseller, description} = req.body;
           //evi properties body nunchi vastunai ga - "req.body"
           //Image - remaining properties to separate ga vastundi kabati
           const image = req.file? req.file.filename: undefined;

         //firmController lo Firm ni Vendor ki add cheyaniki, vendorId base chesukoni Token base meda,Firm ni Vendor ki add chesham    
         //Epudu ithey Firm secure ga Vendor ki add iyindo, epudu e firmId (Database lo unna firmId) base chesukoni, firms loki products add cheyochu
         const firmId= req.params.firmId;
         //firmId create chesham
         //e code similar to getVendorById function lo vendorId ni get cheshey code
         

         //firmId ni get cheyaniki
         const firm = await Firm.findById(firmId);
         //await - Firm nunchi manaku kavalisina firmId ni find chestane untadi, code block avakunda e await keyword & async function use chestam
         
         if(!firm){
            return res.status(404).json({error:"No firm found"});
         }

    } catch (error) {
        
    }
}