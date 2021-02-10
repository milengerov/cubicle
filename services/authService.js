
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");
const {SALT_ROUNDS, SECRET} = require("../config/config")

// const saltRounds = 10;

async function register(username, password) {
    try {
        //TODO... check whether user exists before create it.

        let salt = await bcrypt.genSalt(SALT_ROUNDS);
        let hash = await bcrypt.hash(password, salt);

        const user = new User({username, password: hash});
        return await user.save();
       


    }
    catch (error) {
        console.log(error);
    }

}

async function login({username, password}) {
    //get user from db;
    // let user = await User.findOne({}).where("username").eq(username);
    let user = await User.findOne({username}); 

    if (!user) {
        throw {message: "No such user"}
        
    }

    let passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw {message: "wrong pass"}

    //compare password hash

    //generate token   
    let token = jsonwebtoken.sign({_id: user._id}, SECRET)
    return token;
}

module.exports = {
    register,
    login,
}