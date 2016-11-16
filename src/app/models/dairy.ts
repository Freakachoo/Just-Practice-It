// Model Dairy item
import moment from 'moment'
import {StorageService} from '../../app/services/storage.service'
import aDB from './db'


export default class Dairy extends aDB {

	protected _model_name = 'Dairy'
	// public _storageService

	// constructor(private StorageService: StorageService) {
	// 	super()
	// 	this._storageService = StorageService
	// 	this._db = StorageService._db // Use already created DB
	// 	this._storageService.collection = '333'
	// 	// StorageService.collection = '444'
	// 	this._db.changes({ live: true, since: 'now', include_docs: true})
	// 			.on('change', (change) => this.onDatabaseChange(change, this))
	// }
	//
	// onDatabaseChange(change, __this) {
	// 	console.log('==============11111')
	// 	console.log(this)
	// 	console.log(__this)
	// 	console.log(change)
	// 	__this._storageService.collection = '222'
	// 	console.log('==============11111')
	// 	// this.collection = '222'
	// }

	private _prepareDoc(operation: String, doc) {
		switch(operation) {
			case 'add':
				// Prepare ID
				if (!doc._id) {
					console.log(doc)
					doc._id = `dairy_${moment.utc().format('YYYY-MM-DDTHH:mm:ss:SSS')}`
					console.log(doc)
					doc.type = this._model_name
				}
				break
			case 'get':
				break
			case 'update':
				break
			case 'delete':
				break
		}

		return doc
	}

	save(doc) {
		if (doc._id) {
			return this.update(this._prepareDoc('update', doc))
		} else {
			return this.add(this._prepareDoc('add', doc))
		}
	}

}