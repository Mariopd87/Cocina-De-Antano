module.exports = {
  isAValidParam: function (string) {
    let result = false;

    if (string.match(/^\d+$/) && string !== "") result = true;

    return result;
  },
};
