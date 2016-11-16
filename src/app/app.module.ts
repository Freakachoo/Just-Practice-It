import { NgModule } from '@angular/core'
import { IonicApp, IonicModule } from 'ionic-angular'
import { MyApp } from './app.component'
import { HomePage } from '../pages/home/home'
import { DetailsPage } from '../pages/details/details'
import { StorageService } from './services/storage.service'
import { TagInputModule } from 'ng2-tag-input'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TagInputModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [StorageService]
})
export class AppModule {}
