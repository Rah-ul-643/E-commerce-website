const { URL } = require('url');
const  otpController  = require('../controllers/otpController');

const verifyCode = async (req, res, next) => {

  const urlObject= urlDecoder(req);
  const username= urlObject.searchParams.get('username');
  const queryCode = urlObject.searchParams.get('code');
  const storedObject=await otpController.storedObject(username);


  if (storedObject) {
    let originalCode= storedObject.code;

    if (queryCode === originalCode) next();
    else res.redirect('/user/reset-password');
  
  }

  else {
      res.redirect('/user/reset-password');
    }

};

const urlDecoder= (req)=>{
  
  const baseUrl = req.protocol + '://' + req.get('host');
  const urlString = baseUrl + req.url; // Construct the complete URL

  const urlObject = new URL(urlString);

  return urlObject;
}

module.exports = {verifyCode,urlDecoder};
