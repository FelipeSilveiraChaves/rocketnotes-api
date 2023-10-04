module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || "default3433",
        expiresIn: "1d"
    }
}