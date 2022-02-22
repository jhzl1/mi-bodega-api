const regexPassword =
  /^(?=\D)(?=\w*)(?=\w*[A-Z])(?=.*[@/()#*"%&!;_,.:<>])(?=\w*[a-z])\S{7,}$/;

module.exports = {
  regexPassword,
};
