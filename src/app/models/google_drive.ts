// Class for work with Google Drive, CRUD operations, etc...
import { Injectable } from '@angular/core'
import { RemoteStorageService } from '../../app/services/remoteStorage.service'

@Injectable()
class GoogleDrive {

  constructor(public RemoteStorageService: RemoteStorageService) {
  }

  public save(doc) {
  }

  public delete(doc) {
  }

  // Get one document by Id
  public get(docId) {
  }

  // Get one document by date
  // TODO: what format of Date? Date(), moment(), timestamp?
  public getByDate(Date) {
  }

  // TODO: maybe will be used only to build DB from remote to local ?
  public getAll() {
  }



}