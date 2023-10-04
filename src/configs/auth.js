module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default3333",
        expiresIn: "1d"
    }
}