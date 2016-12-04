// Model Dairy item
import moment from 'moment'
import { Injectable } from '@angular/core'
import aDB from './db'

interface DairyCollection {
	_id: string
	type: string
	content: string
	tags: Array<string>
	date: string

	// :TODO add field:
	// location - coordinates of the place, where was added entity
}

@Injectable()
export default class Dairy extends aDB {

	protected _model_name

	protected getModelName() {
		this._model_name = 'Dairy'
		return this._model_name
	}

	protected _prepareDoc(operation: String, doc: DairyCollection) {
		switch(operation) {
			case 'add':
				// Prepare ID
				if (!doc._id) {
					doc._id = `dairy_${moment.utc().format('YYYY-MM-DDTHH:mm:ss:SSS')}`
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

}