const fs = require("fs");
const models = require('@models')
const smallFirstLetter = require("@lib/smallFirstLetter")

function initApiRoute(app, directory, route) {
    let files = fs.readdirSync(directory);
    files.sort((f1, f2) => {
        var file1 = directory + '/' + f1;
        var file2 = directory + '/' + f2;
        if (fs.statSync(file1).isDirectory() && !fs.statSync(file2).isDirectory()) {
            return -1
        } else if (!fs.statSync(file1).isDirectory() && fs.statSync(file2).isDirectory()) {
            return 1
        } else if (f1 == "middleware.js" && !fs.statSync(file2).isDirectory()) {
            return -1
        } else if (f2 == "middleware.js" && !fs.statSync(file1).isDirectory()) {
            return 1
        }
        return 0
    })
    files.forEach(function (file) {
        var newBase = directory + '/' + file;
        if (fs.statSync(newBase).isDirectory() && (file.slice(file.length - 1) === '_')) {
            initApiRoute(app, newBase, route + '/:' + file.slice(0, file.length - 1));
        } else if (fs.statSync(newBase).isDirectory()) {
            initApiRoute(app, newBase, route + '/' + file);
        } else if (file == "middleware.js") {
            let middleware = require("@" + directory + "/" + "middleware.js");
            if (middleware.use) {
                app.use(route, function (req, res, next) {
                    middleware.use(req, res, next, middleware);
                })
            }
        } else if (!fs.statSync(newBase).isDirectory() && file != "middleware.js" && (file.slice(file.length - 4, file.length - 3) !== "_")) {
            let cRoute = route + '/' + file
            cRoute = cRoute.slice(0, cRoute.length - 3);
            let ctrl = require('@' + newBase);
            let keys = Object.keys(ctrl)
            keys.forEach(key => {
                if (key.indexOf("get") == 0) {
                    let route = key.substring(3).split(/(?=[A-Z])/)
                        .map(function (elem) {
                            return smallFirstLetter(elem);
                        }).join("_");
                    app.get(cRoute + "/" + route, ctrl[key])
                } else if (key.indexOf("post") == 0) {
                    let route = key.substring(4).split(/(?=[A-Z])/)
                        .map(function (elem) {
                            return smallFirstLetter(elem);
                        }).join("_");
                    app.post(cRoute + "/" + route, ctrl[key])
                } else if (key.indexOf("put") == 0) {
                    let route = key.substring(3).split(/(?=[A-Z])/)
                        .map(function (elem) {
                            return smallFirstLetter(elem);
                        }).join("_");
                    app.put(cRoute + "/" + route, ctrl[key])
                } else if (key.indexOf("delete") == 0) {
                    let route = key.substring(6).split(/(?=[A-Z])/)
                        .map(function (elem) {
                            return smallFirstLetter(elem);
                        }).join("_");
                    app.delete(cRoute + "/" + route, ctrl[key])
                }
            });
        } else if (!fs.statSync(newBase).isDirectory() && (file.slice(file.length - 4, file.length - 3) === "_")) {
            let cRoute = route + '/:' + file.slice(0, file.length - 4)
            let ctrl = require('@' + newBase);
            let keys = Object.keys(ctrl)
            keys.forEach(key => {
                if (key.indexOf("get") == 0) {
                    let route = key.substring(3).split(/(?=[A-Z])/)
                        .map(function (elem) {
                            return smallFirstLetter(elem);
                        }).join("_");
                    app.get(cRoute + "/" + route, ctrl[key])
                } else if (key.indexOf("post") == 0) {
                    let route = key.substring(4).split(/(?=[A-Z])/)
                        .map(function (elem) {
                            return smallFirstLetter(elem);
                        }).join("_");
                    app.post(cRoute + "/" + route, ctrl[key])
                } else if (key.indexOf("put") == 0) {
                    let route = key.substring(3).split(/(?=[A-Z])/)
                        .map(function (elem) {
                            return smallFirstLetter(elem);
                        }).join("_");
                    app.put(cRoute + "/" + route, ctrl[key])
                } else if (key.indexOf("delete") == 0) {
                    let route = key.substring(6).split(/(?=[A-Z])/)
                        .map(function (elem) {
                            return smallFirstLetter(elem);
                        }).join("_");
                    app.delete(cRoute + "/" + route, ctrl[key])
                }
            });
        }
    });
}

function initModelRoute(app) {
    let keys = Object.keys(models);
    keys.forEach(key => {
        app.get('/api/' + smallFirstLetter(key) + '/:id', async function (req, res) {
            try {
                let Model = models[key];
                let model = await Model.findOne({
                    where: { id: [Number(req.params.id)] }
                });
                if (model) {
                    res.status(200).send(model)
                } else {
                    res.status(404).send()
                }
            } catch (err) {
                res.status(500).send(err);
            }
        })
        app.get('/api/' + smallFirstLetter(key), async function (req, res) {
            try {
                let Model = models[key];
                let model = await Model.findOne({
                    where: { id: [Number(req.query.id)] }
                });
                if (model) {
                    res.status(200).send(model)
                } else {
                    res.status(404).send()
                }
            } catch (err) {
                res.status(500).send(err);
            }
        })
        app.put('/api/' + smallFirstLetter(key), async function (req, res) {
            try {
                let body = req.body;
                let Model = models[key];
                let model = await Model.create(body);
                if (!model) {
                    throw new Error("Cannot create new " + key);
                }
                res.status(200).send({ id: model.id });
            } catch (err) {
                res.status(500).send(err);
            }
        })
        app.post('/api/' + smallFirstLetter(key), async function (req, res) {
            try {
                let body = req.body;
                let Model = models[key];
                if (body.id) {
                    const success = await Model.update(body, {
                        where: { id: body.id }
                    })
                    if (success) {
                        return res.send({ success: true });
                    } else {
                        throw new Error("Cannot update " + key);
                    }
                } else {
                    res.status(404).send();
                }
            } catch (err) {
                res.status(500).send(err);
            }
        })
        app.delete('/api/' + smallFirstLetter(key) + '/:id', async function (req, res) {
            try {
                let id = req.params.id;
                let Model = models[key];
                const success = Model.destroy({ where: { id: id } })
                if (success) {
                    res.status(200).send({ success: true })
                } else {
                    res.status(404).end();
                }
            } catch (err) {
                res.status(500).send(err);
            }
        })
    });
}

function initSystem() {
    global.Middleware = require('@system/middleware')
}

module.exports = function (app) {
    initSystem();
    initApiRoute(app, 'api', '/api');
    initModelRoute(app)
}
