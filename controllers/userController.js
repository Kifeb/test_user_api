import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const GetUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })

        return res.status(200).json({
            status: "success",
            msg: "success get data",
            data: users
        })

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
};

export const GetUserById = async (req, res) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id)
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })

        if(!user) return res.status(404).json({msg: "Id tidak ditemukan"})

        return res.status(200).json({
            status: "success",
            msg: "berhasil mengambil data",
            data: user
        })

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
};

export const CreateUser = async (req, res) => {
     
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
             },
             select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
         });

         // kembalikan response dalam bentuk json
         return res.status(201).json({
            status: "success",
            msg: `berhasil membuat user dengan id ${response.id}`,
            data: response
        });
     } catch (error) {
        if(error.code === "P2002"){
            return res.status(400).json({msg: "email sudah terdaftar"})
        } else {
            return res.status(500).json({msg: error.message})
        }
     }
};

export const DeleteUserById = async (req, res) => {
    try {
        const deletedUser = await prisma.user.deleteMany({
          where: {
            id: Number(req.params.id)
          }
        });

        if (deletedUser.count == 0) {
            return res.status(404).json({ msg: "id tidak ditemukan"});
        }

        return res.status(200).json({ msg: `User dengan id ${req.params.id} sudah dihapus.`, data: deletedUser });

    } catch (err) {
        res.status(500).json({ msg: err.message});
    }
};