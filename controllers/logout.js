// logs out the user by ending the session

const logout= (req,res)=>{
    req.session.destroy(()=>{
        console.log("user logged out");
    })
    res.redirect('/');
}

module.exports= logout;

