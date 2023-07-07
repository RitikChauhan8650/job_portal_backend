const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");

const bodyParser = require("body-parser");

require("dotenv").config();
var cors = require("cors");

//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoute = require("./routes/jobsTypeRoutes");
const jobRoute = require("./routes/jobsRoutes");

const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error"); //handle custom error
//Add a connection to database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

//to authenticate use cookieparser
app.use(cookieParser());

//to request for backend add cors
app.use(cors());

//routes-create another folder=authroutes
// app.get("/", (req, res) => {
//   res.send("hello from node js");
// });
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", jobTypeRoute);
app.use("/api", jobRoute);
//error custom middleware
app.use(errorHandler);

//serving the frontend
// const path = require("path");
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
// });

//port
const port = process.env.PORT || 3001;

//add a listen
app.listen(port, () => {
  res.setHeader("Access Control Allow Credentials","true");
  console.log(`server is running on port ${port}`);
});
