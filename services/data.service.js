const { request } = require("express");
const session = require("express-session");

const db = require('./db');

let accountDetails = {
    1000: { acno: 1000, username: "userone", balance: 5000, password: "user1" },
    1001: { acno: 1001, username: "usertwo", balance: 3000, password: "user2" },
    1002: { acno: 1002, username: "userthree", balance: 4000, password: "user3" },
}

// const currentUser = ""

const register = (acno,username,password)=>{
    // console.log("Register Called");

	return db.User.findOne({
		acno}).then(user => {
			console.log(user)
			if(user){
				return {
					status: false,
					statusCode: 422,
					message: "User Exit, Please Login"
				}
			}
			else{
				const newUser = new db.User({
					acno,
					username,
					balance:0,
					password
				});
				newUser.save();
				return {
					status: true,
					statusCode: 200,
					message: "Registration Successfull.."
				}
			}
		})
	
  }

  const login = (request, acno, pwd)=>{
	  var acno = parseInt(acno);
	  return db.User.findOne({
		acno:acno,
		password:pwd,
	  }).then(user =>{
		  if(user){
			request.session.currentUser = user;
			  return{
				status: true,
				statusCode: 200,
                message: "Login Successful",
			  }
		  }
		  else{
			return {
                status: false,
				statusCode: 422,
				message: "No User Exist"
            } 
		  }
	  })
}

const deposit = (accno,pwd,amt) => {
	// let dataset = accountDetails;

	return db.User.findOne({
		acno:accno,
		password:pwd,
		// amount:amt
	}).then(user =>{
		if(!user){
			return {
				status: false,
				statusCode: 422,
				message: "incorrect Password"
			}
		}
		else{
			user.balance+=parseInt(amt);
			user.save()
			return{
				status: true,
				statusCode: 200,
				message: "Amount Credited with "  + amt,
				balance: user.balance
			}
		}
	})
}



const withdraw = (accno,pwd,amt) => {
	// var int_amt = parseInt(amt);

	return db.User.findOne({
		acno:accno,
		password:pwd,
	}).then(user =>{
		if(!user){
			return {
				status: false,
				statusCode: 422,
				message: "No User Exist"
			}
		}
		if(amt > user.balance){
			return {
				status: false,
				statusCode: 422,
				message: "Low Balance"
			}
		}
		else{
			user.balance-=parseInt(amt);
			user.save();
			return {
				status: true,
				statusCode: 200,
				message: "Amount Debited with "  + amt,
				balance: user.balance
			}
		}
	})
}

module.exports = {
    register, login, deposit, withdraw
}