import {Component, NgZone} from "@angular/core";
import {NavController, Platform, ModalController} from 'ionic-angular';
import {StorageService} from '../../app/services/storage.service'
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public dairy = []
    public col

    constructor(public StorageService: StorageService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        public modalCtrl: ModalController) {

    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.StorageService.initDB('just_practice_it')
            this.col = this.StorageService.collection
            this.StorageService.models.Dairy.getAll()
              .then(data => {
                    this.zone.run(() => {
                        this.dairy = data.docs
                    })
                })
                .catch(console.error.bind(console))
        });
    }

    showDetail(dairyEntry) {
        let modal = this.modalCtrl.create(DetailsPage, { dairyEntry: dairyEntry })
        modal.present()
        modal.onDidDismiss(() => {
          console.log(this.StorageService.collection)
          // this.col = this.StorageService.collection
          // this.col = '22222'
        })
    }
}