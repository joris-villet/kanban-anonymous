if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const db = require("./db.js");

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors("*"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("node_modules/superagent/dist"));

server.listen(port, () => {
  console.log("app listening to address http://localhost:" + port);
});

// app.use((req, res, next) => {
//   // req.cookies.user = "hahahaha";
//   // console.log(req.cookies.user);

//   if (!req.cookies.user) {
//     console.log("user null");
//     res.redirect("/login");
//   }

//   // res.cookie('cookie', setCookie, {
//   //   httpOnly: false,
//   //   maxAge: 60 * 60 * 1000,
//   //   SameSite: true,
//   //   secure: false
//   // })

//   next();
// });
const userAuth = (req, res, next) => {
  const userToken = req.cookies.userToken;
  console.log("userToken => ", userToken);

  if (!userToken) {
    return res.redirect("/login");
  }

  jwt.verify(userToken, "secret sentence", async (err, decoded) => {
    if (err) {
      console.log("err", err);
      res.redirect("/login");
    } else {
      const user = await db
        .select("*")
        .from("User")
        .where({
          id: decoded.id,
          email: decoded.email,
        })
        .first();

      console.log(user);

      next();
    }
  });
};

app.get("/", (req, res, next) => {
  return res.redirect("/dashboard");
});

app.get("/dashboard", userAuth, (req, res) => {
  res.render("dashboard", {
    title: "Kanban anonymous | dashboard",
  });
});

app.get("/login", (req, res) => {
  return res.render("formEmail");
});

app.post("/card", async (req, res) => {
  const { task, column } = req.body;
  console.log("task => ", task);
  console.log("column => ", column);

  const newCard = await prisma.card.create({
    data: {
      todo: task,
      column: column,
      userId: 1,
    },
  });

  console.log(newCard);

  res.send("xhr ok");
});

app.post("/login/email", async (req, res, next) => {
  const { email } = req.body;

  const user = await db.select("*").from("User").where({ email }).first();

  console.log("user => ", user);

  if (user.first_connection) {
    return res.render("formNewPassword", {
      title: "Kanban anonymous | new pass",
      email: user.email,
    });
  } else {
    return res.render("formPassword", {
      title: "Kanban anonymous | sign up",
      email: user.email,
    });
  }
});

app.post("/login/new/password", async (req, res, next) => {
  const { email, password, repeatPassword } = req.body;

  console.log("email form 2 => ", email);
  console.log(password);
  console.log(repeatPassword);

  if (password !== repeatPassword) {
    return res.render("formNewPassword", {
      title: "Kanban anonymous | new pass",
      email: email,
      error: "password non identique",
    });
  }

  const passwordHashed = bcrypt.hashSync(password, 10);

  const [user] = await db("User").where({ email }).update(
    {
      first_connection: false,
      password: passwordHashed,
    },
    ["email"]
  );

  console.log("user => ", user);

  return res.render("formPassword", {
    title: "Kanban anonymous | sign in",
    email: user.email,
  });
});

app.post("/login/password", async (req, res, next) => {
  const { email, password } = req.body;

  console.log("email form 3 => ", email);
  console.log(password);

  const user = await db.select("*").from("User").where({ email }).first();

  const verifyPassword = bcrypt.compareSync(password, user.password);

  console.log("verifyPassword => ", verifyPassword);

  const userData = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(userData, "secret sentence", { expiresIn: "8h" });

  // Définissez le cookie avec le JWT signé
  res.cookie("userToken", token, {
    httpOnly: true, // Le cookie ne peut être accédé que via le serveur
    maxAge: 8 * 60 * 60 * 1000, // Durée de vie de 8 heures en millisecondes
  });

  if (!verifyPassword) {
    return res.render("formPassword", {
      title: "Kanban anonymous | sign in",
      email: user.email,
      error: "erreur password",
    });
  }

  return res.render("dashboard", {
    title: "Kanban anonymous | dashboard",
  });
});
