import * as express from 'express';
import * as fs from 'fs'
import * as path from 'path' 
var router = express.Router();
var __dataFilePath = global["rootDir"] + "/data/items.json"

router.get('/list', function(req: express.Request, res: express.Response, next: Function) {
    fs.readFile(__dataFilePath, (err, data) => {
		if (err) {
			throw err;
		}
		res.setHeader('Content-Type', 'application/json')
		res.send(data.toString())
	})
})

router.post('/add', function(req: express.Request, res: express.Response, next: Function) {
	
	//validation
	if (req.body.item == null) {
		res.json({ isSuccess: false, message: 'item json data is required.' })
		return
	}
	if (!req.body.item.id) {
		res.json({ isSuccess: false, message: 'id is required.:: ' + JSON.stringify(req.body.item) })
		return
	}

	let item = req.body.item as { id: string, name: string };

    fs.readFile(__dataFilePath, (err, data) => {
		if (err) {
			throw err
		}
		//load items from fileText
		let itemsData = JSON.parse(data.toString());
		let items = itemsData.items as Array<{ id: string, name: string }>;
		//validation
		let sameIdItems = items.filter(x => x.id == item.id) 
		if (sameIdItems.length) {
			res.json({ isSuccess: false, message: 'ID:"' + item.id + '" aleady exists.' })
			return
		}
		//add
		items.push(item)
		itemsData.items = items
		
		//save
		fs.writeFile(__dataFilePath, JSON.stringify(itemsData), (err) => {
			if (err) {
				throw err
			}
			//return result
			res.json({ isSuccess: true, newList: items })
		})
	})
})

router.post('/update', function(req: express.Request, res: express.Response, next: Function) {
	
	//validation
	if (req.body.item == null) {
		res.json({ isSuccess: false, message: 'item json data is required.' })
		return
	}
	if (!req.body.item.id) {
		res.json({ isSuccess: false, message: 'id is required.:: ' + JSON.stringify(req.body.item) })
		return
	}

	let item = req.body.item as { id: string, name: string };

    fs.readFile(__dataFilePath, (err, data) => {
		if (err) {
			throw err
		}
		//load items from fileText
		let itemsData = JSON.parse(data.toString());
		let items = itemsData.items as Array<{ id: string, name: string }>;
		//validation
		let sameIdItems = items.filter(x => x.id == item.id) 
		if (sameIdItems.length == 0) {
			res.json({ isSuccess: false, message: 'ID:"' + item.id + '" does not exist.' })
			return
		}
		//update
		let target = sameIdItems[0]
		target.name = item.name
		itemsData.items = items
		
		//save
		fs.writeFile(__dataFilePath, JSON.stringify(itemsData), (err) => {
			if (err) {
				throw err
			}
			//return result
			res.json({ isSuccess: true, newList: items })
		})
	})
})

router.post('/remove', function(req: express.Request, res: express.Response, next: Function) {
	
	//validation
	if (req.body.id == null) {
		res.json({ isSuccess: false, message: 'id is required.' })
		return
	}

	let id = req.body.id as string;

    fs.readFile(__dataFilePath, (err, data) => {
		if (err) {
			throw err
		}
		//load items from fileText
		let itemsData = JSON.parse(data.toString());
		let items = itemsData.items as Array<{ id: string, name: string }>;
		let newList = items.filter(x => x.id != id)
		//validation 
		if (items.length == newList.length) {
			res.json({ isSuccess: false, message: 'ID:"' + id + '" does not exist.' })
			return
		} 
		//save
		itemsData.items = newList
		fs.writeFile(__dataFilePath, JSON.stringify(itemsData), (err) => {
			if (err) {
				throw err
			}
			//return result
			res.json({ isSuccess: true, newList })
		})
	})
})

export default router;
module.exports = router;