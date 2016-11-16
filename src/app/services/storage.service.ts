import { Injectable } from '@angular/core'

import Dairy from '../models/dairy'

let PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

@Injectable()
export class StorageService {
    public models
    public _db
    private _birthdays
    public collection = window['col']

    initDB(dbName) {
        // this._db = new PouchDB(dbName, { adapter: 'idb', auto_compaction: true });
        this._db = new PouchDB(dbName, { adapter: 'idb' });
        window["PouchDB"] = PouchDB;
        this._modelsLoader()
    }

    private _modelsLoader() {
      this.models = {}
      this.models.Dairy = new Dairy(this)
    }

    getAll() {
        if (!this._birthdays) {
            return this.models.Dairy.getAll()
                .then(results => {
                    // Each row has a .doc object and we just want to send an
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this._birthdays = results.docs.map(row => {
                        // Dates are not automatically converted from a string.
                        // row.doc.Date = new Date(row.doc.Date);
                        return row
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange)

                    return this._birthdays
                })
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._birthdays)
        }
    }

    private onDatabaseChange = (change) => {
        console.log('=================1=1=1=1=1')
        var index = this.findIndex(this._birthdays, change.id)
        var birthday = this._birthdays[index]

        if (change.deleted) {
            if (birthday) {
                this._birthdays.splice(index, 1) // delete
            }
        } else {
            change.doc.date = new Date(change.doc.date)
            if (birthday && birthday._id === change.id) {
                this._birthdays[index] = change.doc // update
            } else {
                this._birthdays.splice(index, 0, change.doc) // insert
            }
        }
    }

    // Binary search, the array is by default sorted by _id.
    private findIndex(array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
        mid = (low + high) >>> 1;
        array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }

}