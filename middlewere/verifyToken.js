import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    
    const authHead = req.headers['authorization'];
    const token = authHead && authHead.split(' ')[1];

    if(token == null) return res.status(401).json({msg: "Unauthorized"})

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.sendStatus(403).json({msg: err.message})
        req.email = decoded.email;
        next();
    })
}