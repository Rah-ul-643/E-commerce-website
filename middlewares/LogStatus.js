//checks the login status using session id

const checkLogStatus = (req,res,next)=> {

    try{
        const user= req.session.user;
        if (user) res.sendFile('project.html', { root: './public' });
        else next();

    } catch(err) {
        console.log(err);
    }
    
}

module.exports= checkLogStatus;