const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bank_server", {useNewUrlParser:true,useUnifiedTopology: true})

// create model => mongoose is unstructured.
const User = mongoose.model("User",{
    acno:Number,
    username: String,
    balance: Number,
    password: String
})


module.exports ={
    User
}