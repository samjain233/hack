const crypto = require("crypto");

const algorithm = process.env.CRYPTOALGO;
const key = process.env.CRYPTOSECRET;

const decrypt = async (salt1 , salt2)=>{
    const iv = Buffer.from(salt1,'base64');
    const decipher = crypto.createDecipheriv(algorithm, key , iv);
    let decryptdata = decipher.update(salt2,"hex","utf-8");
    decryptdata += decipher.final("utf-8");
    const data = {
        string : decryptdata
    }
    return data;
}

module.exports = decrypt;