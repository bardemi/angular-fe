import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { HomeModule } from './home/home.module'
import { AUTH_PROVIDERS } from './auth/auth.module'
// import { authInterceptorProviders } from './auth/auth.interceptor'
import { BrowserModule } from '@angular/platform-browser'
import { environment } from '../environments/environment'
import { RouterModule } from '@angular/router'
import { ROUTES } from './routes'
// import { CreateKundeModule } from './kunde/create-kunde/create-kunde.module'
// import { DetailsKundeModule } from './kunde/details-kunde/details-kunde.module'
import { FooterModule } from './layout/footer/footer.module'
import { HeaderModule } from './layout/header/header.module'
import { MainModule } from './layout/main/main.module'
import { ServiceWorkerModule } from '@angular/service-worker'
import { SucheKundenModule } from './kunde/suche-kunden/suche-kunden.module'
// import { UpdateKundeModule } from './kunde/update-kunde/update-kunde.module'

/* eslint-disable object-curly-newline */

@NgModule({
    declarations: [AppComponent],

    imports: [
        BrowserModule,
        HomeModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        RouterModule.forRoot(ROUTES),
        // CreateKundeModule,
        // DetailsKundeModule,
        SucheKundenModule,
        // UpdateKundeModule,
        FooterModule,
        HeaderModule,
        MainModule,
        AUTH_PROVIDERS,
    ],

    // providers: [authInterceptorProviders],
    bootstrap: [AppComponent],
})
export class AppModule {}
