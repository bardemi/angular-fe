import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * Komponente mit dem Tag &lt;hs-create-umsatz&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    selector: 'kunde-create-umsatz',
    templateUrl: './create-umsatz.component.html',
})
export class CreateUmsatzComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    readonly betrag: FormControl = new FormControl(undefined)
    readonly waehrung: FormControl = new FormControl('')
    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateUmsatzComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('umsatz', this.betrag)
    }
}
