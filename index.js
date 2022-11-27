// 1. Variables Declaration =================================================================

const express = require("express");
const app = express();

var http = require("http").createServer(app);
var io = require("socket.io")(http);

const connection = require("./database/database");
const session = require("express-session");

const users = require("./routes/users");
const products = require("./routes/products");
const deals = require("./routes/deals");

const Category = require("./models/Category");
const Product = require("./models/Product");
const Message = require("./models/Message");
const MessageUser = require("./models/MessageUser");

// 2. Socket Chat + Message System =========================================================

io.on("connection", (socket) => {
  socket.on("join", ({ room }) => {
    socket.join(room);
  });

  socket.on("message", ({ username, userId, room, text }) => {
    Message.create(
      {
        text: text,
        owner: userId,
      },
      {
        returning: true,
      }
    ).then((result) => {
      var userArray = room.split("_");
      MessageUser.create({
        userId: userArray[0],
        messageId: result.id,
      }).then(() => {
        MessageUser.create({
          userId: userArray[1],
          messageId: result.id,
        }).then(() => {
          io.to(room).emit("message", {
            username: username,
            text: text,
          });
        });
      });
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

// 3. Database Connection ===================================================================

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com a base de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// 4. User Session ========================================================================

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3000000000 },
  })
);

// 5. Others =============================================================================

require("dotenv").config({ path: "./config/config.env" });

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.use("/user/", users);
app.use("/product/", products);
app.use("/product/", products);
app.use("/deal/", deals);

global.sessionCategories = "";

Category.findAll().then((categories) => {
  sessionCategories = categories;
  Product.findAll().then(products=>{
    picsArray =[];
    products.forEach(product => {
      picsArray.push(product.picture)
    })
    app.get("/", function (req, res) {
      res.render("home", {
        user: req.session.user,
        categories: sessionCategories,
        pictures: picsArray,
      });
    });
  })
});

http.listen(process.env.PORT, () => {
  console.log("Servidor ativo!");
});
