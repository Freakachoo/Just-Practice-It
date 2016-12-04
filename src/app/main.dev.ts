import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StorageService } from './services/storage.service'
import { RemoteStorageService } from './services/remoteStorage.service'

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule, [StorageService, RemoteStorageService]);
