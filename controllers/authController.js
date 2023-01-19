import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const Register = async (req, res) => {
    // Ambil payload dari client dengan req.body
    const {name, email, password, confirmPassword, role} = req.body;

    // cek password dan confirm password lalu cocokkan
    if (password !== confirmPassword) return res.status(400).json({msg: "password dan confirm passoword tidak cocok"})

    // Proses Hash Password dengan bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Proses input ke database
    try {
        const response = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                role
            }
        });
        return res.status(201).json({
            status: "success",
            msg: "success created user",
            data: response.id
        });
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

export const Login = async (req, res) => {
    
    try {
        // Ambil user berdasarkan email
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        })

        //bandingkan password dari client dengan password di database
        const match = bcrypt.compareSync(req.body.password, user.password);
        if(!match) res.status(400).json({msg: "Wrong Password"});

        const userId = user.id
        const name = user.name
        const userEmail = user.email

        //buat accesstoken 
        const accessToken = jwt.sign({userId, name, userEmail}, process.env.ACCESS_TOKEN, {
            expiresIn: '1d'
        })

        //daftarkan accesstoken ke cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 100
        });

        res.status(201).json({accessToken})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}