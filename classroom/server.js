const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session"); 
const flash = require("connect-flash");
const path = require("path");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// app.use(cookieParser("secretcode"));


// app.get("/getsignedcookie", (req, res)=>{
//     res.cookie("made-in", "India", {signed: true});
//     res.send("signed cookie sent");
// });

// app.get("/verify", (req, res) =>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });




// app.get("/getCookies", (req, res)=>{
//     res.cookie("great","hello");
//     res.cookie("madeIn", "India");
//     res.send("sent you some cookies!");
// });

// app.get("/greet", (req, res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hi, ${name}`);;
// })


// app.get("/", (req, res)=>{
//     console.log(req.cookies);
//     res.send("Hi, I am root!");
// })

// app.use("/users", users);
// app.use("/posts", posts);


const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res)=>{
    let  {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
     req.flash("error", "user not registered");
    } else{
         req.flash("success", "user registered succesfully!");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) =>{
    res.locals.successMsg = req.flash("success");
      res.locals.errorMsg = req.flash("error");
  res.render("page.ejs", {name: req.session.name,});  
});




// app.get("/reqcount", (req, res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//       req.session.count = 1;
//     }
   
//     res.send(`you sent a request ${req.session.count} times`);
// })



// app.get("/test", (req, res)=>{
//     res.send("test successful");
// });



app.listen(3000, ()=>{
    console.log("server is listening to 3000");
});