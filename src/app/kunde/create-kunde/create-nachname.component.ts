import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * Komponente mit dem Tag &lt;hs-create-nachname&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'kunde-create-nachname',
    templateUrl: './create-nachname.component.html',
})
export class CreateNachnameComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    readonly nachname = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2), // eslint-disable-line no-magic-numbers
        Validators.pattern(/^\w.*$/u),
    ])

    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateNachnameComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('nachname', this.nachname)
    }
}
