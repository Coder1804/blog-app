const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const login = (req,res)=>{
    const {username , password} = req.body;
//    check username
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q,[username], (err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

    //    check password
        const isPasswordCorrect = bcrypt.compareSync(password,data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password");


        const token = jwt.sign({
                id: data[0].id,
            },
            "jwtsecretkey"
        )
        console.log(token)
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json({...data[0],password:null})

        console.log(res.cookie);
    })
}
const register = (req,res)=>{
    const {email , username , password = "empty"} = req.body;
    console.log(email , username ,password)
//    check if user already in db
    const q = "SELECT * FROM users WHERE  email = ? OR username = ? ";
    db.query(q,[email,username],(err,data)=>{
        if(err) return res.status(500).json({err,message:"somtheing went wrong"});
        if(data.length) return res.status(409).json({message:"user already exist"})

    //    Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

    //    insert data
        const q = "INSERT INTO users(`username`,`email` , `password`) VALUES(?)";
        const values = [
            username,
            email,
            hash
        ]
        db.query(q,[values], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json({message:"User has been created"})
        })

    });
}
const logout = (req,res)=>{
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}

module.exports = {login,register,logout}