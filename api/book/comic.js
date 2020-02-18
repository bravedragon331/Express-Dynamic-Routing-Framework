// GET - api/book/comic
exports.get = function (req, res) {
  res.json({ success: true })
}
// GET - api/book/comic/my_comic
exports.getMyComic = function (req, res) {
  console.log("Get my comic");
  res.json({ type: "getMyComic" })
}
// POST - api/book/comic
exports.post = function (req, res) {
  res.json({ success: true })
}
// POST - api/book/comic/my_comic
exports.postMyComic = function (req, res) {
  console.log("Post my comic");
  res.json({ type: "postMyComic" })
}
exports.put = function (req, res) {
  res.json({ success: true })
}
exports.delete = function (req, res) {
  res.json({ success: true })
}
