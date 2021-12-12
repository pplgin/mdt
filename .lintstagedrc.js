// .lintstagerc
module.exports = {
  'src/**/*.{js?(x),ts,tsx,vue}': ['eslint src --ext ts,tsx,js,jsx'],
  'common/**/*.{js?(x),ts,tsx,vue}': ['eslint src --ext ts,tsx,js,jsx'],
};
