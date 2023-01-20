export const validate = (req, res, next) => {
    const {name, email, password, confirmPassword, role} = req.body;

    if(name === undefined || name == "") {
        return res.status(400).json({msg: "nama harus diisi"})
    }

    if(email === undefined || email == "") {
        return res.status(400).json({msg: "email harus diisi"})
    }

    if(password === undefined || password == "") {
        return res.status(400).json({msg: "password harus diisi"})
    }

    if(role === undefined || role == "") {
        return res.status(400).json({msg: "role harus diisi"})
    }

    next()
}