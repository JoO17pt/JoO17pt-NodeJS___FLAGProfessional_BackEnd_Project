// 1. Variables Declaration =================================================================

const express = require("express");
const app = express();
const connection = require("./database/database");
const session = require("express-session");

const users = require('./routes/users');

// 2. Database Connection ===================================================================

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com a base de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// 3. Database Connection ===================================================================
app.use(session({
    secret: "backendproject", 
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }
}))

// app.get("/session",function(req,res){
//     req.session.nome="Fernando";
//     req.session.ano="1974";
//     req.session.user= {
//         username: "flira",
//         email:"it.fernandolira@gmail.com",
//         id:5
//     }
//     res.send("Ok");
// });

app.get("/leitura",function(req,res){
    res.json({nome: req.session});
});


// X. XXXXXXXXXXXXXXXXXX ===================================================================

require("dotenv").config({path: './config/config.env'});

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



app.use("/user/",users);

app.get("/",function(req,res){
    res.send("Home Page");
});

app.listen(process.env.PORT,()=>{console.log("Servidor ativo!");});