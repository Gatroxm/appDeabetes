import { ApplicationConfig, importProvidersFrom, mergeApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import  routes  from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptors ,withFetch} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SamplingService } from '@services/sampling.service';
import { LoginService } from '@services/login.service';
import { ToastService } from '@services/toast.service';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([]) ),

    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    SamplingService,
    LoginService,
    ToastService
  ],
};
export const config = mergeApplicationConfig(appConfig, appConfig);
