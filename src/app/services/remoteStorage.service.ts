import { Injectable } from '@angular/core'

import Dairy from '../models/dairy'

@Injectable()
export class RemoteStorageService {
    public _db

    constructor() {
      console.log('Im a constructor of StorageService!')
    }

    initRemote(dbName, callback) {
      // TODO: get cridentials... something else?
    }

}