import { Component, OnInit } from '@angular/core'
import { HOME_PATH, log } from '../../shared'
import {
    faCheck,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { Kunde } from '../shared/kunde'
import { KundeService } from '../shared/kunde.service'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { Title } from '@angular/platform-browser'

@Component({
    selector: 'kunde-create-kunde',
    templateUrl: './create-kunde.component.html',
})
export class CreateKundeComponent implements OnInit {
    form = new FormGroup({}) //eslint-disable-line object-curly-newline
    showWarning = false
    fertig = false

    readonly faCheck = faCheck
    readonly faExclamationTriangle = faExclamationTriangle
    readonly faExclemationTriangleSize: SizeProp = '2x'

    constructor(
        private kundeService: KundeService,
        private router: Router,
        private titleService: Title,
    ) {
        console.log('CreateKundeComponent.constructor()')
        if (router !== undefined) {
            console.log('Injizierter Router:', router)
        }
    }

    @log
    ngOnInit() {
        this.titleService.setTitle('Neuer Kunde')
    }

    @log
    onSave() {
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid     true/false
        //    dirty     true/false, falls der Wert geaendert wurde

        // if (!this.form.valid) {
        //     console.log('Validierungsfehler:', this.form)
        //     return false
        // }

        const neuerKunde = Kunde.fromForm(this.form.value)
        console.log('neuer Kunde:', neuerKunde)

        const successFn = (location: string | undefined) => {
            console.log(
                `CreateKunde.onSave(): successFn(): location: ${location}`,
            )
            console.log(
                `CreateKunde.onSave(): successFn(): navigate: ${HOME_PATH}`,
            )
            this.fertig = true
            this.showWarning = false
            this.router.navigate([HOME_PATH])
        }
        const errorFn = (
            status: number,
            errors: { [s: string]: any } | undefined,
        ) => {
            console.error(`CreateKunde.onSave(): errorFn(): status: ${status}`)
            console.error('CreateKunde.onSave(): errorFn(): errors', errors)
        }
        this.kundeService.save(neuerKunde, successFn, errorFn)

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum Refresh
        // der gesamten Seite
        return false
    }

    toString() {
        return 'CreateKundeComponent'
    }
}
