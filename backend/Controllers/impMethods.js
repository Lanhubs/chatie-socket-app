exports.object_null_type_converter = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([k, v]) => {
      return true;
    })
  );
};
