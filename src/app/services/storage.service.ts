import { Injectable } from '@angular/core'

import Dairy from '../models/dairy'

let PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const minimongo =require('minimongo')

@Injectable()
export class StorageService {
    public models
    public _db

    constructor() {
      console.log('Im a constructor of StorageService!')
    }

    initDB(dbName, callback) {
        // this._db = new PouchDB(dbName, { adapter: 'idb', auto_compaction: true });
        // this._db = new PouchDB(dbName, { adapter: 'idb' });
        // window["PouchDB"] = PouchDB;
        this._db = new minimongo.IndexedDb({namespace: dbName}, () => {
          this._modelsLoader(callback)
        })
    }

    private _modelsLoader(callback) {
      this.models = {}
      this.models.Dairy = new Dairy(this)
      Promise.all( [this.models.Dairy.getAll()] )
      .then(callback)
    }

}