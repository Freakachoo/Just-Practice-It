// Class-abstract with CRUD operations
import { Injectable } from '@angular/core'
import {StorageService} from '../../app/services/storage.service'

@Injectable()
abstract class aDB {
	protected _db
	protected _model_name
	public collections = []

	constructor(public StorageService: StorageService) {
		this._db = StorageService._db // Use already created DB
		this._db.addCollection(this.getModelName())
		// this._db.changes({ live: true, since: 'now', include_docs: true})
		// 		.on('change', (change, changeInstance) => this.onDatabaseChange(change, changeInstance, this))
		// return this.getAll()
	}

	onDatabaseChange(change, changeInstance, __this) {
		console.log('==============')
		console.log(change)
		console.log('==============')
	}


	public save(doc) {
		return this._upsert(this._prepareDoc( (doc._id ? 'update' : 'add') , doc))
	}

	public delete(doc) {
		return this._delete(doc).then(() => {
			this.collections.splice(this.collections.findIndex((el) => el._id === doc._id), 1)
			return doc
		})
	}

	// Get one document by Id
	public get(docId) {
		return this._db.get(docId, { include_docs: true })
	}

	// Get All docs and save it to storage in memory: StorageService.models.${_model_name_}.collections - Array<Object>
	public getAll() {
		return this._getAll()
			.then( (results: Array<Object>) => {
					// Each row has a .doc object and we just want to send an
					// array of collections objects back to the calling controller,
					// so let's map the array to contain just the .doc objects.

					this.collections = results.map(row => {
							// Dates are not automatically converted from a string.
							// row.doc.Date = new Date(row.doc.Date);
							return row
					});

					// Listen for changes on the database.
					// this._db.changes({ live: true, since: 'now', include_docs: true})
					// 		.on('change', this.onDatabaseChange)
					return this.collections
			})
	}

	// @params Date - {Number} timestamp
	public getByDate(Date) {
		// TODO: complete construction of key - add date there 
		return this._getAll({_id: {$regex: `${this._model_name.toLowerCase()}`}})
	}

	private _getAll(filter: any = {}) {
		filter.type = this._model_name
		return new Promise( (resolve, reject) => {
			this._db[this._model_name].find(filter)
			.fetch((result) => {
				resolve(result)
			})
		})
	}

	// Prepare document before operations.
	// Add type of item, prepare _id, etc...
	//
	// @params operation - {String} - type of CRUD operation.
	//		possible values: 'add', 'get', 'update', 'delete'
	// @params doc - {Object} - JSON object of document
	protected abstract _prepareDoc(operation: String, doc: Object): Object

	// Getter of model name. this._model_name
	protected abstract getModelName() : String

	protected _add(doc) {
			return this._db.put(doc)
				.then(() => {
					this.collections.push(doc)
					return doc
				})
	}

	protected _update(doc) {
		return this._db.put(doc)
	}

	protected _upsert(doc) {
		return new Promise( (resolve, reject) =>  {
			this._db[this._model_name].upsert(doc, () => {
				let ind = this.collections.findIndex((el) => el._id === doc._id)
				if (ind > -1 ) {
					this.collections[ind] = doc
				} else {
					this.collections.push(doc)
				}
				resolve(doc)
			})
		})
	}

	protected _delete(doc) {
		return new Promise( (resolve, reject) => {
			this._db[this._model_name].remove(doc._id, (err) => {
				if (err) {console.log(err)}
				resolve()
			})
		})
	}

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