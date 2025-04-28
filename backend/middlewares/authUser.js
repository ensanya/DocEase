// import jwt from 'jsonwebtoken'

// //user authentication middleware

// const authUser= async(req,res,next)=>{
//     try{
//         const {token}= req.headers
//         if(!token){
//             return res.json({success:false,message:"Not authorised"})
//         }
//         const tokendecode= jwt.verify(token,process.env.JWT_SECRET)
//         req.body.userId= tokendecode.id
//         next()
//     }catch(e){
//         console.log(e);
//         res.json({success:false,message:e.message})
//     }
// }
// export default authUser;
import jwt from 'jsonwebtoken'

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not authorised" });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure req.body is initialized before setting userId
        if (!req.body) {
            req.body = {}; // Initialize req.body if it's undefined
        }

        req.body.userId = tokenDecode.id;  // Set userId

        next(); // Proceed to the next middleware or route handler
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: e.message });
    }
};

export default authUser;
