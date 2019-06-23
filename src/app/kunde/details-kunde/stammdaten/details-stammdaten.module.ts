import { CommonModule } from '@angular/common'
import { DetailsNachnameModule } from './details-nachname.module'
import { DetailsGeschlechtModule } from './details-geschlecht.module'
import { DetailsEmailModule } from './details-email.module'
// import { DetailsGeburtsdatumModule } from './details-geburtsdatum.module'
// import { DetailsAdresseModule } from './details-adresse.module'
import { DetailsHomepageModule } from './details-homepage.module'
import { DetailsStammdatenComponent } from './details-stammdaten.component'
import { NgModule } from '@angular/core'

@NgModule({
    declarations: [DetailsStammdatenComponent],
    exports: [DetailsStammdatenComponent],
    imports: [
        CommonModule,
        DetailsNachnameModule,
        DetailsGeschlechtModule,
        DetailsEmailModule,
        // DetailsGeburtsdatumModule,
        // DetailsAdresseModule,
        DetailsHomepageModule,
    ],
})
export class DetailsStammdatenModule {}
