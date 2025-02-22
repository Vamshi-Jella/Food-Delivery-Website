const mongoose =require('mongoose');

const firmSchema= new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique:true
    },
    area: {
        type: String,
        required: true,
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
    region:{
        type:[
            {
               type:String,
               enum: ['South-Indian','North-Indian','Chinese','Bakery']   
            }
        ]
    },
    offer:{
        type:String,
    },
    image:{
        type:String
    },
    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vendor'
        }
    ],
    // epudu ithey type lo - default method pass cheshamo, apudu e Firm ah Vendor Model ki link ithadi / relate chestunam
    // nko key value eyali - reference -"ref" - ae Model tho - Database lo unna ae table tho, e Firm table relate avutundi / relate cheyali ani
    // ela Firm-Vendor relation form chestam
    // elage e relation ni Vendor Model lo add cheyali
    product:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product'
            }
        ]
    
});

const Firm = mongoose.model('Firm', firmSchema);
module.exports= Firm;
