const foodPartnerModel = require("../models/foodPartner.model");
const foodModel = require("../models/food.model");

async function getFoodPartnerById(req, resp) {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodPartnerModel.findById(foodPartnerId);

  const foodItemsByFoodPartner = await foodModel.find({
    foodPartner: foodPartnerId,
  });

  const totalVideos = foodItemsByFoodPartner.length;

  if (!foodPartner) {
    return resp.status(404).json({ message: "Food Partner not found..." });
  }
  resp.status(200).json({
    message: "Food Partner retrieved successfully...",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
      totalVideos,
    },
  });
}

module.exports = {
  getFoodPartnerById,
};


