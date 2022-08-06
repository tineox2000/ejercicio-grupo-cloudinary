const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./src/utils/database/database");

const cloudinary = require("cloudinary").v2;

const playersRoutes = require("./src/api/players/player.routes");
const teamRoutes = require("./src/api/teams/teams.routes");

dotenv.config();
db.connect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_NAME,
});

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE"); 
  res.header("Access-Control-Allow-Credentials", "true"); 
  res.header("Access-Control-Allow-Headers", "Content-Type"); 
  next();
})

app.use("/players", playersRoutes);
app.use("/teams", teamRoutes);

app.use(cors({
  origin: '*',
  credentials: true
}))

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found");
});

app.use((error, req, res, next) => {
  //Para cualquier error que suceda en la aplicación
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});


app.listen(PORT, () => {
    console.log(`listening in http://localhost:${PORT}`);
  });

