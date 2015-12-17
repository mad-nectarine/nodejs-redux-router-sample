'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = express.Router();
var __dataFilePath = global["rootDir"] + "/data/items.json";
router.get('/list', function (req, res, next) {
    fs.readFile(__dataFilePath, function (err, data) {
        if (err) {
            throw err;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data.toString());
    });
});
router.post('/add', function (req, res, next) {
    //validation
    if (req.body.item == null) {
        res.json({ isSuccess: false, message: 'item json data is required.' });
        return;
    }
    if (!req.body.item.id) {
        res.json({ isSuccess: false, message: 'id is required.:: ' + JSON.stringify(req.body.item) });
        return;
    }
    var item = req.body.item;
    fs.readFile(__dataFilePath, function (err, data) {
        if (err) {
            throw err;
        }
        //load items from fileText
        var itemsData = JSON.parse(data.toString());
        var items = itemsData.items;
        //validation
        var sameIdItems = items.filter(function (x) {
            return x.id == item.id;
        });
        if (sameIdItems.length) {
            res.json({ isSuccess: false, message: 'ID:"' + item.id + '" aleady exists.' });
            return;
        }
        //add
        items.push(item);
        itemsData.items = items;
        //save
        fs.writeFile(__dataFilePath, JSON.stringify(itemsData), function (err) {
            if (err) {
                throw err;
            }
            //return result
            res.json({ isSuccess: true, newList: items });
        });
    });
});
router.post('/update', function (req, res, next) {
    //validation
    if (req.body.item == null) {
        res.json({ isSuccess: false, message: 'item json data is required.' });
        return;
    }
    if (!req.body.item.id) {
        res.json({ isSuccess: false, message: 'id is required.:: ' + JSON.stringify(req.body.item) });
        return;
    }
    var item = req.body.item;
    fs.readFile(__dataFilePath, function (err, data) {
        if (err) {
            throw err;
        }
        //load items from fileText
        var itemsData = JSON.parse(data.toString());
        var items = itemsData.items;
        //validation
        var sameIdItems = items.filter(function (x) {
            return x.id == item.id;
        });
        if (sameIdItems.length == 0) {
            res.json({ isSuccess: false, message: 'ID:"' + item.id + '" does not exist.' });
            return;
        }
        //update
        var target = sameIdItems[0];
        target.name = item.name;
        itemsData.items = items;
        //save
        fs.writeFile(__dataFilePath, JSON.stringify(itemsData), function (err) {
            if (err) {
                throw err;
            }
            //return result
            res.json({ isSuccess: true, newList: items });
        });
    });
});
router.post('/remove', function (req, res, next) {
    //validation
    if (req.body.id == null) {
        res.json({ isSuccess: false, message: 'id is required.' });
        return;
    }
    var id = req.body.id;
    fs.readFile(__dataFilePath, function (err, data) {
        if (err) {
            throw err;
        }
        //load items from fileText
        var itemsData = JSON.parse(data.toString());
        var items = itemsData.items;
        var newList = items.filter(function (x) {
            return x.id != id;
        });
        //validation
        if (items.length == newList.length) {
            res.json({ isSuccess: false, message: 'ID:"' + id + '" does not exist.' });
            return;
        }
        //save
        itemsData.items = newList;
        fs.writeFile(__dataFilePath, JSON.stringify(itemsData), function (err) {
            if (err) {
                throw err;
            }
            //return result
            res.json({ isSuccess: true, newList: newList });
        });
    });
});
exports.default = router;

module.exports = router;