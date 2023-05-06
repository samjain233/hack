const crypto = require("crypto");

const algorithm = process.env.CRYPTOALGO;
const key = process.env.CRYPTOSECRET;

const encrypt = async (str) => {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptdata = cipher.update(str, "utf-8", "hex");
    encryptdata += cipher.final("hex");
    const base64data = Buffer.from(iv, "binary").toString("base64");
    const obj = {
      salt1: base64data,
      salt2: encryptdata,
    };
    return obj;
  } catch (err) {
    console.log(err);
  }
};

module.exports = encrypt;
