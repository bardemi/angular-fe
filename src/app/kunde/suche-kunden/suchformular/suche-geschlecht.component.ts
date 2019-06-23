import { Component } from '@angular/core'

import { Geschlecht } from '../../shared/kunde'

@Component({
    selector: 'kunde-suche-geschlecht',
    templateUrl: './suche-geschlecht.component.html',
})
export class SucheGeschlechtComponent {
    geschlecht: Geschlecht | undefined

    constructor() {
        console.log('SucheGeschlechtComponent.constructor()')
    }
}
