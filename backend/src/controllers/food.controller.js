const foodModel = require("../models/food.model");
const userModel = require("../models/user.models");
const storageService = require("../services/storage.services");
const { v4: uuid } = require("uuid");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");

async function createFood(req, resp) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  resp.status(201).json({
    message: "Food created successfully...",
    food: foodItem,
  });
}

async function getFoodItems(req, resp) {
  try {
    const foodItems = await foodModel.find({}).lean();

    let foodWithLikes;

    if (req.user) {
      // User logged in, check likes
      foodWithLikes = await Promise.all(
        foodItems.map(async (food) => {
          const liked = await likeModel.findOne({
            user: req.user._id,
            food: food._id,
          });

          return {
            ...food,
            isLiked: liked ? true : false,
          };
        })
      );
    } else {
      // User not logged in, all isLiked = false
      foodWithLikes = foodItems.map((food) => ({
        ...food,
        isLiked: false,
      }));
    }

    resp.status(200).json({
      message: "Food items fetch successfully...",
      foodItems: foodWithLikes,
    });
  } catch (err) {
    console.error("Error in getFoodItems:", err);
    resp.status(500).json({ message: "Server error" });
  }
}

async function likeFood(req, resp) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLike = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLike) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });
    return resp.status(200).json({
      message: "Food unLike successfully...",
      isLiked: false
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  resp.status(201).json({
    message: "Food Like successfully...",
    like,
    isLiked: true 
  });
}

async function saveFood(req, resp) {
  const { foodId } = req.body
  const user = req.user

  const isAlreadySave = await saveModel.findOne({
    user: user._id,
    food: foodId,
  })

  if(isAlreadySave){
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    })
    await foodModel.findByIdAndUpdate( foodId, {
      $inc: {saveCount: -1}
    } )

    return resp.status(200).json({
      message: "Food unSaved successfully...",
      isSave: false,
    })
  }

  await saveModel.create({
    user: user._id,
    food: foodId,
  })

  await foodModel.findByIdAndUpdate( foodId, {
    $inc: {saveCount: 1},
  })

  resp.status(201).json({
    message: "Food save successfully...",
    isSave: true,
  })

}

async function getSavedFood(req, resp) {
  try {
    const userId = req.user._id;

    // Get saved foods and populate
    const savedFoods = await saveModel.find({ user: userId })
      .populate('food')
      .lean();

    if (!savedFoods.length) {
      return resp.status(404).json({ message: "No saved food found" });
    }

    // Add isLiked for each food
    const saveFood = await Promise.all(
      savedFoods.map(async ({ food, _id }) => {
        const liked = await likeModel.exists({ user: userId, food: food._id });
        return {
          ...food,
          isLiked: !!liked,
          saveId: _id, // optional
        };
      })
    );

    resp.status(200).json({ message: "Saved food retrieved successfully", saveFood });
  } catch (err) {
    console.error("Error in getSavedFood:", err);
    resp.status(500).json({ message: "Server error" });
  }
}


// async function getSavedFood(req, resp) {
//   const user = req.user

//   const saveFood = await saveModel.find({ user: user._id}).populate('food')

//   if(!saveFood || saveFood.length === 0){
//     return resp.status(404).json({ message: "No saved food found"})
//   }

//   resp.status(200).json({ message: "Saved food retrived successfully",
//     saveFood,
//   })

// }

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFood,
};
