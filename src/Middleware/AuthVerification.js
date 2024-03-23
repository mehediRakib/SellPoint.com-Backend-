const {DecodeToken} = require("../utility/TokenHelper");

module.exports=async (req, res, next) => {
    let token = req.headers['token']
    if (!token) {
        token = req.cookies['token']
    }

   let result= await DecodeToken(token);

    if(DecodeToken===null){
        return res.status(401).json({status:"fails",data:"unauthorised"});
    }
    else {
        let email=result['email'];
        let userID=result['userID']
        req.headers.email=email;
        req.headers.userID=userID;
        next();
    }
}