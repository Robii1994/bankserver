const { request } = require("express");
const session = require("express-session");

let accountDetails = {
    1000: { acno: 1000, username: "userone", balance: 5000, password: "user1" },
    1001: { acno: 1001, username: "usertwo", balance: 3000, password: "user2" },
    1002: { acno: 1002, username: "userthree", balance: 4000, password: "user3" },
}

// const currentUser = ""

const register = (acno,username,password)=>{
    console.log("Register Called");

	if(acno in accountDetails){
		return {
            status: false,
			statusCode: 422,
            message: "User Exit, Please Login"
        }
	}
	else{
		accountDetails[acno]={
			acno,
			username,
			balance:0,
			password,
		}
		// this.saveDetails()
		console.log(accountDetails);
		return {
            status: true,
			statusCode: 200,
            message: "Registration Successfull.."
        }
	}
  }

  const login = (request, ac_no, pswd)=>{
	let dataset = accountDetails;
	if(ac_no in dataset){
		var pwd1 = dataset[ac_no].password;
		if(pswd == pwd1){
		  request.session.currentUser = dataset[ac_no];
			// this.saveDetails()
			return {
                status: true,
				statusCode: 200,
                message: "Login Successful",
            }
		}
		else{
			return {
                status: false,
				statusCode: 422,
                message: "incorrect Password"
            }
		}
	}
	else{
		return {
            status: false,
			statusCode: 422,
            message: "No User Exist"
        }
	}
}

const deposit = (accno,pwd,amt) => {
	var int_amt = parseInt(amt);
	let dataset = accountDetails;
	if(accno in dataset){
		var pwd1 = dataset[accno].password;
		if(pwd == pwd1){
			dataset[accno].balance+=int_amt;
			// this.saveDetails()
			return {
				status: true,
				statusCode: 200,
				message: "Amount Credited with "  + amt,
				balance: dataset[accno].balance
			}
		}
		else{
			return {
				status: false,
				statusCode: 422,
				message: "incorrect Password"
			}
		}
	}
	else{
		return {
			status: false,
			statusCode: 422,
			message: "Invalid Form"
		}
	}
}


const withdraw = (accno,pwd,amt) => {
	var int_amt = parseInt(amt);
	let dataset = accountDetails;
	var avlamt = dataset[accno].balance;

	if(accno in dataset){
		var pwd1 = dataset[accno].password;
		if(pwd == pwd1){
			if(avlamt > amt){
				var total = dataset[accno].balance-=int_amt;
				// this.saveDetails()
				return {
					status: true,
					statusCode: 200,
					message: "Amount Debited with "  + amt,
					balance: dataset[accno].balance
				}
			}
			else{
				return {
					status: false,
					statusCode: 422,
					message: "Low Balance"
				}
			}
		}
		else{
			return {
				status: false,
				statusCode: 422,
				message: "incorrect Password"
			}
		}
	}
	else{
		return {
			status: false,
			statusCode: 422,
			message: "Invalid Form"
		}
	}
}

module.exports = {
    register, login, deposit, withdraw
}