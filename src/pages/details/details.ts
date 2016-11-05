import {Component} from '@angular/core';
import {Modal, NavParams, ViewController} from 'ionic-angular';
import {BirthdayService} from '../../app/services/birthday.service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
    public birthday;
    public isNew = true;
    public action = 'Add';
    public isoDate = '';

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private birthdayService: BirthdayService) {
        this.birthday = this.navParams.get('birthday');
        if (!this.birthday) {
            console.log('=====4')
            this.birthday = {Name: ''};
        }
    }

    ionViewDidLoad() {
        console.log('====1')
        this.birthday = this.navParams.get('birthday');

        if (!this.birthday) {
            this.birthday = {Name: ''};
        }
        else {
            this.isNew = false;
            this.action = 'Edit';
            this.isoDate = this.birthday.Date.toISOString().slice(0, 10);
        }
    }

    save() {
        console.log('=====5')
        this.birthday.Date = new Date(this.isoDate);

        if (this.isNew) {
          console.log('=====6')
            this.birthdayService.add(this.birthday)
                .catch(console.error.bind(console));
        } else {
          console.log('=====7')
            this.birthdayService.update(this.birthday)
                .catch(console.error.bind(console));
        }

        console.log('=====7')
        this.dismiss();
    }

    delete() {
        this.birthdayService.delete(this.birthday)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.birthday);
    }
}