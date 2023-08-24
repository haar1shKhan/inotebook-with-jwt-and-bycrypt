const jwt = require("jsonwebtoken");
const jwt_sec = "legond";

const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    
    if (!token) {
        res.status(401).send("Enter correct authication");
    }
    
    try {
    const data = jwt.verify(token, jwt_sec);
        console.log(data)
    req.user = data;

    next();
  } catch (err) {
    res.status(401).send("Enter correct authication");
  }
};

module.exports=fetchUser
