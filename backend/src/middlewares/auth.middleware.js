const userModel = require("../models/user.models");
const foodPartnerModel = require("../models/foodPartner.model");

const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, resp, next) {
  const token = req.cookies.token;
  if (!token) {
    return resp.status(401).json({
      message: "Please login first...",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return resp.status(401).json({
      message: "Invalid token...",
    });
  }
}

async function authUserMiddleware(req, resp, next) {
  const token = req.cookies.token;

  if (!token) {
    return resp.status(401).json({
      message: "Please login first...",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    return resp.status(401).json({
      message: "Invalid token...",
    });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
