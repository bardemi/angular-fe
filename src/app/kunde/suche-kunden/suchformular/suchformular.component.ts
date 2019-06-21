import { Component, Output, ViewChild } from '@angular/core'
import { faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { fadeIn, log } from '../../../shared'
import { KundeService } from '../../shared/kunde.service'
import { Subject } from 'rxjs'
// import { SucheArtComponent } from './suche-art.component'
// import { SucheSchlagwoerterComponent } from './suche-schlagwoerter.component'
import { SucheNachnameComponent } from './suche-nachname.component'
// import { SucheVerlagComponent } from './suche-verlag.component'

@Component({
    selector: 'kunde-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
})
export class SuchformularComponent {
    @Output()
    readonly waiting = new Subject<boolean>()

    readonly faInfoCircle = faInfoCircle
    readonly faSearch = faSearch

    @ViewChild(SucheNachnameComponent)
    private readonly sucheNachnameComponent!: SucheNachnameComponent

    // @ViewChild(SucheVerlagComponent)
    // private readonly sucheVerlagComponent!: SucheVerlagComponent

    // @ViewChild(SucheArtComponent)
    // private readonly sucheArtComponent!: SucheArtComponent

    // @ViewChild(SucheSchlagwoerterComponent)
    // private readonly sucheSchlagwoerterComponent!: SucheSchlagwoerterComponent

    // DI: Constructor Injection (React hat uebrigens keine DI)
    // Empfehlung: Konstruktor nur fuer DI
    constructor(private readonly kundeService: KundeService) {
        console.log('SuchformularComponent.constructor()')
    }

    @log
    onFind() {
        const { nachname } = this.sucheNachnameComponent
        // const { verlag } = this.sucheVerlagComponent
        // const { art } = this.sucheArtComponent
        // const { javascript } = this.sucheSchlagwoerterComponent
        // const { typescript } = this.sucheSchlagwoerterComponent
        const suchkriterien: any = {
            nachname,
            // verlag,
            // art,
            // javascript,
            // typescript,
        }
        console.log('suchkriterien=', suchkriterien)

        // Observables = Event-Streaming mit Promises
        this.waiting.next(true)
        this.kundeService.find(suchkriterien)
        return false
    }

    toString() {
        return 'SuchformularComponent'
    }
}
