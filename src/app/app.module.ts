import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
// import { authInterceptorProviders } from './auth/auth.interceptor'

/* eslint-disable object-curly-newline */

@NgModule({
    declarations: [AppComponent],

    imports: [
        HomeModule
        

    ],

    providers: [authInterceptorProviders],
    bootstrap: [AppComponent],
})

export class AppModule {}