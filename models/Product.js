const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['Veg', 'Non-Veg']
            }
        ]
    },
    // Multiple Values ki - properties ela rayali(array lo rayali)
    image:{
        type:String
    },
    bestSeller:{
        type:String
    },
    description:{
        type:String
    },
    //Relation
    firm:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Firm' 
        // e command & reference to - firm table to e product table ni relate chesham
        //Product Model create chesham, relation kuda echam, a relation firm lo kuda add cheyali
    }],
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;
