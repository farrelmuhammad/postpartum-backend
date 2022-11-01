const { User } = require("../models");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        res.status(400);
        return res.json({ status: 400, message: "Data cannot be empty!" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const isUsernameRegistered = await Users.findOne({
            where: {
                username: username,
            },
        });
        if (isUsernameRegistered) {
            res.status(409);
            return res.json({
                status: 409,
                message: "Email already exist!",
            });
        }
        const user = await Users.create({
            username: username,
            password: hashPassword,
            role: role,
        });
        // await Profiles.create({
        //     UserId: user.id,
        //     name: name,
        // });
        res.status(201);
        return res.json({
            message: "Register success!",
            statusCode: 201,
            data: user,
        });
    } catch (error) {
        res.status(500);
        return res.json({
            status: 500,
            message: "Something went wrong!",
            error: error.stack,
        });
    }
};

module.exports = register;