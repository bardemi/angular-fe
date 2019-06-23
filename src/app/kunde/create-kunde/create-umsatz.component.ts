import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
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

    readonly umsatz: FormControl = new FormControl(
        undefined,
        Validators.required,
    )
    readonly waehrung: FormControl = new FormControl('EUR')
    readonly betrag: FormControl = new FormControl(123)

    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateUmsatzComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('umsatz', this.umsatz)
        this.form.addControl('waehrung', this.waehrung)
        this.form.addControl('betrag', this.betrag)
    }
}
