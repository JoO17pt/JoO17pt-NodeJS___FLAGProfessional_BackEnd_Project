// 1. Variables Declaration =================================================================

const express = require("express");
const app = express();
const connection = require("./database/database");
const session = require("express-session");

const users = require('./routes/users');
const products = require('./routes/products');

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
    cookie: { maxAge: 3000000000 }
}))

app.get("/leitura",function(req,res){
    res.json({name: req.session});
});


// X. XXXXXXXXXXXXXXXXXX ===================================================================

require("dotenv").config({path: './config/config.env'});

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public')); 

app.use("/user/",users);
app.use("/product/",products);

app.get("/",function(req,res){
    req.session.user != undefined ? user = req.session.user : user = null;
    res.render("home",{user: user});
});

app.listen(process.env.PORT,()=>{console.log("Servidor ativo!");});