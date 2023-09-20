const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')//login ke time pe generate karna hai
const bcrypt = require("bcryptjs")
const jwtSecret = "ThisIsMyFirstMernProject$$$$$$$$"//secret for user

router.post("/createuser", [

    //validation
    body("email", "Incorrect Email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("studentId").isLength(10),
    body("semester").isLength(1),
    //password must be at least 5 length
    body("password", "Incorrect Password").isLength({ min: 5 })],

    async (req, res) => {                         //endpoint
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //bcrypt is a hashing algorithm
        const salt = await bcrypt.genSalt(10);//to encrypt password
        let securePassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                studentId: req.body.studentId,
                semester: req.body.semester,
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    //validation
        body("email", "Incorrect Email").isEmail(),
    //password must be at least 5 length
        body("password", "Incorrect Password").isLength({ min: 5 })],
        async (req, res) => {                         //endpoint
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let email = req.body.email;                       //endpoint
            try {
                let userData = await User.findOne({ email });//find data matching with the email, returns user complete data
                if (!userData) {
                    
                    return res.status(400).json({ errors: "try logging with correct credentials" });
                }

                const passwordCompare = await bcrypt.compare(req.body.password, userData.password)//because userData.password is in hash format/ encrpted.

                if (!passwordCompare) {
                    return res.status(400).json({ errors: "try logging with correct credentials" });
                 }
                //we will send a authorization token to save in user side
                const data = {
                    user: {
                        id: userData.id
                    }
                }//jab tak user cache clear nahi karega tab tak ye data nahi jayega
                const authToken = jwt.sign(data, jwtSecret)
                return res.json({ success: true, authToken: authToken });

            } 
            catch (error) {
                console.log(error);
                res.json({ success: false });
            }
        })

module.exports = router;