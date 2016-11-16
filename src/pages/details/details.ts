
import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import moment from 'moment'

import {StorageService} from '../../app/services/storage.service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
    public isNew = true;
    public action = 'Add';
    public isoDate
    public dairyEntry

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private StorageService: StorageService) {
        this.dairyEntry = this.navParams.get('dairyEntry')
        console.log(this.dairyEntry)
        if (!this.dairyEntry) {
            this.dairyEntry = {content: '', tags: [], date: moment.utc().toISOString()}
        } else {
          this.isNew = false
        }
    }

    ionViewDidLoad() {
        if (this.dairyEntry.date) {
          this.isoDate = moment(this.dairyEntry.date).local().format('YYYY-MM-DDTHH:mm')
        }
    }

    save() {
        this.dairyEntry.date = moment(this.isoDate).utc().toISOString()

        this.StorageService.models.Dairy.save(this.dairyEntry)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    delete() {
        this.StorageService.models.Dairy.delete(this.dairyEntry)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    // Hide Modal window
    dismiss() {
        this.viewCtrl.dismiss(this.dairyEntry);
    }
}