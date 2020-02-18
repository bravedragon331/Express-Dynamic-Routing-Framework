// GET - api/book/:miser
exports.get = function (req, res) {
    res.json({ type: "miser_" })
}

// POST - api/book/:miser/miser
exports.getMiser = function (req, res) {
    res.json({ type: "getMiser_" })
}