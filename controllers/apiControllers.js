// does all the API functions, follows the api routes

const ProductController= require("./ProductController");
const getAllItems= ProductController.getAllItems;


const getProducts= async (req,res)=>{
    const items= await getAllItems();
    res.send(items);
}


const getAuthStatus = (req,res)=>{
        const user= req.session.user;
        if (user)
            res.send(user);
        else res.send(false)
}

module.exports= {getAuthStatus,getProducts};