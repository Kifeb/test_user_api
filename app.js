import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js"

//Konfigurasi file .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


// Routes for user
app.use("/", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome to My API"
    })
})

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log('Server Running On Port ' + process.env.APP_PORT)
})
