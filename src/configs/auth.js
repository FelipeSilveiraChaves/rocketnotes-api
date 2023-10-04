module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default4333",
        expiresIn: "1d"
    }
}