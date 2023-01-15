const bcrypt = require("bcrypt");

function object_null_type_converter(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([k, v]) => {
      return true;
    })
  );
}

const hashPwd = async (pwd) => {
  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(pwd, salt);
  return hashed;
};
module.exports = { object_null_type_converter, hashPwd };
