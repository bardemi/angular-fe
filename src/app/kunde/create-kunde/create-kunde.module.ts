import { CommonModule } from '@angular/common'
import { CreateNachnameModule } from './create-nachname.module'
import { CreateEmailModule } from './create-email.module'
import { CreateKategorieModule } from './create-kategorie.module'
import { CreateNewsletterModule } from './create-newsletter.module'
import { CreateGeburtsdatumModule } from './create-geburtsdatum.module'
import { CreateUmsatzModule } from './create-umsatz.module'
import { CreateHomepageModule } from './create-homepage.module'
import { CreateGeschlechtModule } from './create-geschlecht.module'
import { CreateFamilienstandModule } from './create-familienstand.module'
import { CreateInteressenModule } from './create-interessen.module'
import { CreateAdresseModule } from './create-adresse.module'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { CreateKundeComponent } from './create-kunde.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
    declarations: [CreateKundeComponent],
    exports: [CreateKundeComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        CreateAdresseModule,
        CreateFamilienstandModule,
        CreateGeburtsdatumModule,
        CreateGeschlechtModule,
        CreateHomepageModule,
        CreateInteressenModule,
        CreateKategorieModule,
        CreateNachnameModule,
        CreateEmailModule,
        CreateNewsletterModule,
        CreateUmsatzModule,
    ],
    providers: [Title],
})
export class CreateKundeModule {}
