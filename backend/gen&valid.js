const crypto = require("crypto");

exports.genePassword = (password) => {
    const rSalt = crypto.randomBytes(64).toString("hex");
    const rHash = crypto.pbkdf2Sync(password, rSalt, 30000, 64, "sha512").toString("hex");

    return {
        salt: rSalt,
        hash: rHash
    }
}

exports.isValidPass = (password, hash, salt) => {
    const newHash = crypto.pbkdf2Sync(password, salt, 30000, 64, "sha512").toString("hex");
    return newHash === hash
} 