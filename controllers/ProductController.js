// all CRUD opertions on products into the database
// pass the model name into model (from models) and the data as an object from the invoking endpoint
const products= require('../models/products'); 

const addProduct= async (data)=>{
    // add the new product id to products model...
    const newProduct=  new products(data);
    await newProduct.save();
    console.log("New Product added");
}

const getAllItems= async ()=> {
    
    const items= await products.find({});
    return items;
}

const getOne= async (id) =>{
    const item = await products.findOne({_id: id});
    return item;
}

module.exports = {addProduct,getAllItems,getOne};