const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const adminMiddleware = async(req, res, next)=>{
    try {
        if(!req.user.isAdmin){
            return res
            .status(403)
            .json({message: "Access denied, user is ot admin"});
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;