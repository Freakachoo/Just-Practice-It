import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { StorageService } from './services/storage.service'

import { AppModuleNgFactory } from './app.module.ngfactory';

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
