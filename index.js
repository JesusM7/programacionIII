const express = require("express");
const { engine } = require("express-handlebars");
const myconnection = require("express-myconnection");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");

app.use(session({
   secret: "secret",
   resave: true,
   saveUninitialized: true
}));

const connection = require("./database/db");
app.use(express.static('public'));

app.get("/", (req, res) => {
   res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/login", (req, res) => {
   res.sendFile(`${__dirname}/public/login.html`);
});

app.get("/registro", (req, res) => {
   res.sendFile(`${__dirname}/public/registro.html`);
});

app.post("/register", async (req, res) => {
   const { user, email, pass } = req.body;
   let passwordH = await bcrypt.hash(pass, 10);
   console.log(passwordH);
   connection.query(`INSERT INTO users(name, email, pass) VALUES ("${user}", "${email}", "${passwordH}")`,
      function (err, resultado) {
         if (!err) {
            res.statusCode = 200;
            res.json({ message: "Guardado!", error: false });
         } else {
            res.statusCode = 500;
            res.json({ message: "Ocurrio un error", error: true });
         }
      });
});

app.post('/login', async (req, res) => {
   const { email, pass } = req.body;
   connection.query(`SELECT * FROM users WHERE email = "${email}"`,
    async function (err, resultado) {
      if(err) {
         res.json({error:true});
      } else {
         if(resultado.length > 0) {
            const hashedPassword = resultado[0].pass;
            const plainPassword = pass;
            const passwordResult = await bcrypt.compare(plainPassword, hashedPassword);
            console.log(passwordResult);
            if(passwordResult) {
               res.json({ message: "Exitoso!", error: false, name: resultado[0].name });
            } else {
              res.json({ message: "Contraseña es incorrecta!", error: true });
            }
         } else {
            res.json({ message: "El usuario no existe!", error: true });
         }
      }
   });
});

app.set("port", 3000);
app.listen(app.get("port"), () => { console.log("server activo") });