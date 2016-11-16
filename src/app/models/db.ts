// Class-abstract with CRUD operations
import {StorageService} from '../../app/services/storage.service'

abstract class aDB {
	protected _db
	protected _storageService
	protected _model_name
	public collection
	protected _this = this

	constructor(public StorageService: StorageService) {
		this._storageService = StorageService
		this._db = StorageService._db // Use already created DB
		this._storageService.collection = '333'
		// StorageService.collection = '444'
		this._db.changes({ live: true, since: 'now', include_docs: true})
				.on('change', (change, changeInstance) => this.onDatabaseChange(change, changeInstance, this))
	}

	onDatabaseChange(change, changeInstance, __this) {
		console.log('==============')
		console.log(change)
		console.log('==============')
		__this._storageService.collection = '222'
	}

	// Prepare document before operations.
	// Add type of item, prepare _id, etc...
	//
	// @params operation - {String} - type of CRUD operation.
	//		possible values: 'add', 'get', 'update', 'delete'
	// @params doc - {Object} - JSON object of document
	// abstract _prepareDoc(operation: String, doc: Object): Object

	add(doc) {
			return this._db.put(doc)
	}

	get(docId) {
		return this._db.get(docId, { include_docs: true })
	}

	update(doc) {
			return this._db.put(doc)
	}

	delete(doc) {
		return this._db.remove(doc)
	}

	upsert(doc) {
		return this._db.upsert(doc)
	}

	getAll() {
		return this._db.find({selector: {type: this._model_name}})
	}

	// getAll(collection_type) {
	//
	// 		if (!this._birthdays) {
	// 				return this._db.allDocs({ include_docs: true})
	// 						.then(docs => {
	//
	// 								// Each row has a .doc object and we just want to send an
	// 								// array of birthday objects back to the calling controller,
	// 								// so let's map the array to contain just the .doc objects.
	//
	// 								this._birthdays = docs.rows.map(row => {
	// 										// Dates are not automatically converted from a string.
	// 										row.doc.Date = new Date(row.doc.Date);
	// 										return row.doc;
	// 								});
	//
	// 								// Listen for changes on the database.
	// 								this._db.changes({ live: true, since: 'now', include_docs: true})
	// 										.on('change', this.onDatabaseChange);
	//
	// 								return this._birthdays;
	// 						});
	// 		} else {
	// 				// Return cached data as a promise
	// 				return Promise.resolve(this._birthdays);
	// 		}
	// }


	// private onDatabaseChange = (change) => {
	// 		var index = this.findIndex(this._birthdays, change.id);
	// 		var birthday = this._birthdays[index];
	//
	// 		if (change.deleted) {
	// 				if (birthday) {
	// 						this._birthdays.splice(index, 1); // delete
	// 				}
	// 		} else {
	// 				change.doc.Date = new Date(change.doc.Date);
	// 				if (birthday && birthday._id === change.id) {
	// 						this._birthdays[index] = change.doc; // update
	// 				} else {
	// 						this._birthdays.splice(index, 0, change.doc) // insert
	// 				}
	// 		}
	// }
	//
	// // Binary search, the array is by default sorted by _id.
	// private findIndex(array, id) {
	// 		var low = 0, high = array.length, mid;
	// 		while (low < high) {
	// 		mid = (low + high) >>> 1;
	// 		array[mid]._id < id ? low = mid + 1 : high = mid
	// 		}
	// 		return low;
	// }
}

export default aDB