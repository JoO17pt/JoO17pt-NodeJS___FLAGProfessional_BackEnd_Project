// 1. Variables Declaration =================================================================

const express = require("express");
const app = express();
const connection = require("./database/database");

// 2. Database Connection ===================================================================

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com a base de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// X. XXXXXXXXXXXXXXXXXX ===================================================================

require("dotenv").config({path: './config/config.env'});

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/",function(req,res){
    res.send("Ok!");
});

app.listen(process.env.PORT,()=>{console.log("Servidor ativo!");});