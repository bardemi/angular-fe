import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './auth/auth.interceptor'

/* eslint-disable object-curly-newline */

@NgModule({
    declarations: [AppComponent],

    imports: [
        

    ],

    providers: [authInterceptorProviders],
    bootstrap: [AppComponent],
})

export class AppModule {}