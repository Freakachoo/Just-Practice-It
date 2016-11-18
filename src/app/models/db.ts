// Class-abstract with CRUD operations
import { Injectable } from '@angular/core'
import {StorageService} from '../../app/services/storage.service'

@Injectable()
abstract class aDB {
	protected _db
	protected _model_name
	public collections

	constructor(public StorageService: StorageService) {
		this._db = StorageService._db // Use already created DB
		this._db.changes({ live: true, since: 'now', include_docs: true})
				.on('change', (change, changeInstance) => this.onDatabaseChange(change, changeInstance, this))
		// return this.getAll()
	}

	onDatabaseChange(change, changeInstance, __this) {
		console.log('==============')
		console.log(change)
		console.log('==============')
	}

	// Prepare document before operations.
	// Add type of item, prepare _id, etc...
	//
	// @params operation - {String} - type of CRUD operation.
	//		possible values: 'add', 'get', 'update', 'delete'
	// @params doc - {Object} - JSON object of document

	public save(doc) {
		if (doc._id) {
			return this._update(this._prepareDoc('update', doc))
		} else {
			return this._add(this._prepareDoc('add', doc))
		}
	}

	public delete(doc) {
		return this._delete(doc)
	}

	protected abstract _prepareDoc(operation: String, doc: Object): Object

	protected _add(doc) {
			return this._db.put(doc)
				.then(() => {
					this.collections.push(doc)
					return doc
				})
	}

	get(docId) {
		return this._db.get(docId, { include_docs: true })
	}

	protected _update(doc) {
			return this._db.put(doc)
	}

	protected _delete(doc) {
		console.log('DELETE IT')
		return this._db.remove(doc._id)
			.then(() => {
				this.collections.splice(this.collections.findIndex((el) => el._id === doc._id), 1)
				return doc
			})
			.catch( (err, arg2) => {
				console.log(err, arg2)
			})
	}

	// Get All docs and save it to storage in memory: StorageService.models.${_model_name_}.collections - Array<Object>
	getAll() {
		return this._getAll()
			.then(results => {
					// Each row has a .doc object and we just want to send an
					// array of collections objects back to the calling controller,
					// so let's map the array to contain just the .doc objects.

					this.collections = results.docs.map(row => {
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

	private _getAll() {
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