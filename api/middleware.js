module.exports = function (req, res, next) {
  console.log('book middleware')
  next()
}