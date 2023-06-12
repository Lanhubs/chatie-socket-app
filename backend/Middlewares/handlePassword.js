const CryptoJS = require("crypto-js");
const kokoro= "Chatie"

exports.encryptPwd=(password)=>{
  const encryptedPwd = CryptoJS.AES.encrypt(password, kokoro).toString()
  return encryptedPwd
}
exports.decryptPassword=(password, encryptedPwd)=>{
  const decryptPwd =CryptoJS.AES.decrypt(encryptedPwd, kokoro)
  const decryptedPassword = decryptPwd.toString(CryptoJS.enc.Utf8)
  return password === decryptedPassword 
}
