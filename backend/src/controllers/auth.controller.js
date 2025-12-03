const userModel  = require('../models/user.models');
const foodPartnerModel  = require('../models/foodPartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

async function registerUser(req, resp){

    const {fullName, email, password} = req.body;

    const isUserAlreadyExists  = await userModel.findOne({
        email,
    })

    if(isUserAlreadyExists ){
        return resp.status(400).json({
            message: "User already exists..."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword,
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET )

resp.cookie("token", token);

    resp.status(201).json({
        message: "User register successfully...",
        user:{
            id: user._id,
            email: user.email,
            fullname: user.fullName,
        }
    })

}

async function loginUser(req, resp) {
    
const {email, password} = req.body;

const user = await userModel.findOne({
    email,
})

if(!user){
    return resp.status(400).json({
        message: "Invalid email or password"
    })
}

const isPasswordValid = await bcrypt.compare(password, user.password);

if(!isPasswordValid){
    return resp.status(400).json({
        message: "Invalid email or password"
    })
}

const token = jwt.sign({
    id: user._id,
}, process.env.JWT_SECRET)

resp.cookie("token", token)



 resp.status(200).json({
    message: "User loggedIn successfully...",
    user: {
        id: user._id,
    email: user.email,
    fullName: user.fullName
    }
    
 })

}

function logoutUser(req, resp) {
    resp.clearCookie("token")
    resp.status(200).json({
        message: "User logged out successfully..."
    })
}


async function registerFoodPartner(req, resp) {

    const {email, name, password, phone, address, contactName} = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email,
    })

    if(isAccountAlreadyExists){
        return resp.status(400).json({
            message: "Food partner account already exists..."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const foodPartner = await foodPartnerModel.create({
        name,
        phone,
        address, 
        contactName,
        email,
        password: hashedPassword,
    })

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)

  resp.cookie("token", token)



    resp.status(201).json({
        message: "Food partner register successfully",
        foodPartner:{
            id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
        }
    })
    
}

async function loginFoodPartner(req, resp) {
    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email,
    })

    if(!foodPartner){
        return resp.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password)

    if(!isPasswordValid){
        return resp.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

resp.cookie("token", token)

    resp.status(200).json({
        message: "Food partner loggedIn successfull...",
        foodPartner: {
            id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name,
        }
    })

}

function logoutFoodPartner(req, resp){
    resp.clearCookie("token")
    resp.status(200).json({
        message: "Food partner logged out successfully..."
    })
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
}