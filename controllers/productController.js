const Product = require("../models/Product");
// Images kuda unnai kabati, Images ni import chesukoniki - multer package
const multer = require("multer");
const Firm = require("../models/Firm");


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
         //Ekada "firmId= req.params.firmId" antey firmId = params nunchi get chestunam, kabati e ".firmId" ni dynamic ga route lo add cheyali
         

         //firmId ni get cheyaniki
         const firm = await Firm.findById(firmId);
         //await - Firm nunchi manaku kavalisina firmId ni find chestane untadi, code block avakunda e await keyword & async function use chestam
         
         if(!firm){
            return res.status(404).json({error:"No firm found"});
         }
         //Oka instance create cheshi mana products property ni instance ki save cheshi, ah instance dwara(products properties ni) Product Model loki add(push) chestunam, edi cheyali antey Database loki add cheyali
         const product = new Product ({
            productName, price, category, bestseller, description, image, firm:firm._id
         })
         //Product Model lo firm kuda property ey kabati, firm kuda add chestunam
         //Database lo firm table id - "_id" ani untadi andukey firm:firm._id

         const savedProduct = await Product.save();
         //Above products ani Product Model loki save chestunam

         firm.products.push(savedProduct);
         //e saved product ni firm loki push chestunam
         //Push cheshaka firm ni kuda save chestunam
         await firm.save();
         
         //Above process ok/success ithey, e response vastadi
         res.status(200).json(savedProduct)

    } catch (error) {
        console.error(error); // console.error(error) = console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {addProduct:[upload.single('image'), addProduct]};