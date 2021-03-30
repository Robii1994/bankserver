const { request, response, json } = require("express");
const express = require("express"); // import Express
const session = require("express-session"); // import Session
const dataService = require("./services/data.service") //import dataService
const app = express(); // create app with express
app.use(express.json()); // data parse into json format

app.use(session({
    secret: "randomsecurestring",
    resave: false,
    saveUninitialized: false
}))

const logMiddleware = (request, response, next)=>{
    console.log(request.body);
    next();
}
app.use(logMiddleware);

const authMiddleware = (request, response, next)=>{
    if(!request.session.currentUser){
		return response.json ({
			status: false,
			statusCode: 401,
			message: "Please Login"
		})
	}
    else{
        next();
    }
}

app.get("/", (request, response)=>{ // express Routing
    response.send("Get Method");
})

app.post("/register", (request, response)=>{
    // console.log(request.body);
    const result = dataService.register(
        request.body.acno,
        request.body.username,
        request.body.password
    )
    console.log(response.status(result.statusCode).json(result));
})

app.post("/login", (request, response)=>{
    // console.log(request.body);
    const result = dataService.login(
        request,
        request.body.acno,
        request.body.pswd
    )
    console.log(response.status(result.statusCode).json(result));
})

app.post("/deposit", authMiddleware, (request, response)=>{
    // console.log(request.session.currentUser);
    const result = dataService.deposit(
        request.body.acno,
        request.body.pwd,
        request.body.amt
    )
    console.log(response.status(result.statusCode).json(result));
})

app.post("/withdraw", authMiddleware, (request, response)=>{
    const result = dataService.withdraw(
        request.body.acno,
        request.body.pwd,
        request.body.amt
    )
    console.log(response.status(result.statusCode).json(result));
})

// app.post("/", (request, response)=>{
//     response.send("Post Method")
// })
// app.put("/", (request, response)=>{
//     response.send("Put Method")
// })
// app.patch("/", (request, response)=>{
//     response.send("Patch Method")
// })
// app.delete("/", (request, response)=>{
//     response.send("Delete Method")
// })
app.listen(4000,()=>{ // port define
    console.log("Node.js")
});