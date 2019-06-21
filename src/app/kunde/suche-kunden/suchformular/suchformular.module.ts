import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

// import { SucheArtModule } from './suche-art.module'
// import { SucheSchlagwoerterModule } from './suche-schlagwoerter.module'
import { SucheNachnameModule } from './suche-nachname.module'
//import { SucheVerlagModule } from './suche-verlag.module'
import { SuchformularComponent } from './suchformular.component'

@NgModule({
    declarations: [SuchformularComponent],
    exports: [SuchformularComponent],
    imports: [
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        // SucheArtModule,
        // SucheSchlagwoerterModule,
        SucheNachnameModule,
        // SucheVerlagModule,
    ],
})
export class SuchformularModule {}
