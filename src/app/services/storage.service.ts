import { Injectable } from '@angular/core'

import Dairy from '../models/dairy'

let PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

@Injectable()
export class StorageService {
    public models
    public _db

    constructor() {
      console.log('Im a constructor of StorageService!')
    }

    initDB(dbName) {
        // this._db = new PouchDB(dbName, { adapter: 'idb', auto_compaction: true });
        this._db = new PouchDB(dbName, { adapter: 'idb' });
        window["PouchDB"] = PouchDB;
        return this._modelsLoader()
    }

    private _modelsLoader() {
      this.models = {}
      this.models.Dairy = new Dairy(this)
      return Promise.all( [this.models.Dairy.getAll()] )
    }

}