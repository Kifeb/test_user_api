import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js"
import bodyParser from "body-parser";

//Konfigurasi file .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())


// Routes for user
app.use("/", authRoutes);
app.use("/api/users", userRoutes);

//Welcome Route
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome to My API"
    })
})

// Error Handle Route
app.use((err, req, res, next) => {

    res.json({
        status: "fail",
        msg: "url/endpoint yang anda masukkan salah",
        error: err.message
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log('Server Running On Port ' + process.env.APP_PORT)
})
