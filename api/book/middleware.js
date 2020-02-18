module.exports = function (req, res, next) {
  console.log('comic middleware')
  next()
}