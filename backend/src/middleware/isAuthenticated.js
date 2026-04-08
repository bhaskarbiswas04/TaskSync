import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"

const isAuthenticated = async (req, res, next)=>{
    try {
        let token;

        //-get token from header
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
          return res.status(401).json({
            message: "Not authorized, no token",
          });
        }

        //-verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("DECODED:", decoded);

        //-Get user from the token.
        req.user = await User.findById(decoded.userId).select("-password");

        next();
    } catch (error) {
        return res.status(401).json({
          message: "Not authorized, invalid token",
        });
    }
}

export default isAuthenticated;