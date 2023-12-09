const cart = require('../models/cart');
const productController = require('./ProductController');

const addToCart = async (req, res) => {
    const user = req.session.user;

    if (user) {
        const username= user.username;
        const productId = req.params.id;
        console.log("product id: " + productId);

        try {
            const userCart = await cart.findOne({username:username});

            if (userCart) {
                const productIndex = userCart.products.findIndex(product => product.id === productId);

                if (productIndex !== -1) {
                    // Product exists already => update quantity.
                    userCart.products[productIndex].quantity += 1;
                    console.log("item quantity updated.");
                } else {
                    // New product, add to the cart.
                    userCart.products.push({ id: productId, quantity: 1 });
                    console.log("new product added to cart");
                }

                await userCart.save();

            } else {
                // Create a new cart and add the product.
                const newCart = new cart({
                    username: username,
                    products: [{ id: productId, quantity: 1 }]
                });

                await newCart.save();
                console.log("New cart created and product added");
            }
            const cartCount= userCart.products.length;
            res.status(200).json({'cartCount': cartCount});

        } catch (error) {
            console.error("Error: " + error);
        }
    } else {
        console.log("No user logged in");
        res.status(400).send({message: "login"});
    }
}


const getCartCount= async (req,res) =>{
    const user = req.session.user;
    if (user){
        const username= user.username;

        const userCart = await cart.findOne({username:username});
        let cartCount=0;

        if (userCart){
            const products=userCart.products;
            cartCount= userCart.products.length;
        }
        
        
        res.json({cartCount: cartCount});
    } 
    else{
        res.status(400).send({message: "No user"});
    }
}


const getCartPage= async (req,res)=>{

    const user=req.session.user;
    const username=user.username;
    const object= await cart.findOne({'username':username});

    const cartProducts=[]
    let cartCount=0;
    let totalPrice=0;

    if (object){
        const items=object.products;
        cartCount=0;

        for (let item of items){
            
            const id=item.id;
            const productObject= await productController.getOne(id);
            
            // calculating total price
            let price=productObject.price;
            
            const tempArr=price.split(',');
            let newPrice='';
            tempArr.forEach(char=>{
                newPrice+=char;
            });

            price=Number(newPrice);
            totalPrice+=price * item.quantity;
            
            // total products
            cartCount+=item.quantity;

            const tempObject={...productObject._doc, quantity:item.quantity}
            
            cartProducts.push(tempObject);
        }
        
    }
    
    res.render('cart.ejs',{cartProducts,cartCount,totalPrice});
}

const deleteFromCart= async (req,res)=>{

    const productId=req.params.id
    
    try {
        const user= req.session.user;
        const username= user.username;
        const userCart= await cart.findOne({'username':username});
        const itemIndex= userCart.products.findIndex(product=> product.id===productId);
        userCart.products.splice(itemIndex,1);

        await userCart.save();

        res.status(200).send({message:"success"});

    } catch (error) {
        console.log("Error while deleting item from cart:\n "+error);
        res.status(400).send({message:'unable to fetch'});
    } 
}

const updateQuantity= async (req,res)=>{

    const productId=req.params.id
    const newQuantity=req.params.quantity;
    
    try {
        const user= req.session.user;
        const username= user.username;
        const userCart= await cart.findOne({'username':username});
        const itemIndex= userCart.products.findIndex(product=> product.id===productId);
        userCart.products[itemIndex].quantity=newQuantity;

        await userCart.save();
        console.log("quantity updated");
        res.status(200).send({message:"success"});
        

    } catch (error) {
        console.log("Error while deleting item from cart:\n "+error);
        res.status(400).send({message:'unable to fetch'});
    } 
}

module.exports = { addToCart,getCartCount,getCartPage,deleteFromCart,updateQuantity};
