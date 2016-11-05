import {Component, NgZone} from "@angular/core";
import {Modal, NavController, Platform, ModalController} from 'ionic-angular';
import {BirthdayService} from '../../app/services/birthday.service';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public birthdays = [];

    constructor(private birthdayService: BirthdayService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        public modalCtrl: ModalController) {

    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.birthdayService.initDB();

            this.birthdayService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.birthdays = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }

    showDetail(birthday) {
        let modal = this.modalCtrl.create(DetailsPage, { birthday: birthday });
        modal.present();

        // modal.onDismiss(() => {
        //
        // });
    }
}