const jwt = require('jsonwebtoken')

accessControl = {
    USER: "user",
    ADMIN: "admin",
}

const authorize = (rolename) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const payload = decodeToken(token)

            if (!!rolename && rolename != payload.role)
                return res.status(403).json({
                    message: `${payload.role} tidak dapat mengakses halaman ini!`
                })

            req.user = payload;
            req.id = payload.userId
            next();
        }
        catch (err) {
            res.json({
                statusCode: 401,
                message: 'Silahkan login terlebih dahulu!'
            })
        }
    }
}

const decodeToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = {authorize}