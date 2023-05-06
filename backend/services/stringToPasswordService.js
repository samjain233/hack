const md5 = require("md5");
const strToPass = async (string, userPassword) => {
  const str1 = string.slice(0, 10);
  const str2 = string.slice(10);
  const concatStringtoUserPassword = str1 + userPassword + str2;
  const hashedPassword = md5(concatStringtoUserPassword);
  const newPassword =
    hashedPassword.slice(0, 5) +
    hashedPassword.slice(10, 15) +
    hashedPassword.slice(-6);
  return newPassword;
};
module.exports = strToPass;
