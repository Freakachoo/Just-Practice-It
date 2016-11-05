import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BirthdayService } from './services/birthday.service'

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule, [BirthdayService]);
