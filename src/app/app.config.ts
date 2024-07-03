import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {icons, LucideAngularModule} from 'lucide-angular';
import PocketBase from "pocketbase";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch()), importProvidersFrom(
    LucideAngularModule.pick(icons)
  )]
};

export const apiUrl = environment.apiUrl;
export const pb = new PocketBase(apiUrl);
