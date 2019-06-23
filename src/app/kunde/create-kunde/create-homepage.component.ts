import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * Komponente mit dem Tag &lt;hs-create-homepage&gt;, um das Erfassungsformular
 * f&uuml;r ein neues Buch zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'kunde-create-homepage',
    templateUrl: './create-homepage.component.html',
})
export class CreateHomepageComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly homepage = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2), // eslint-disable-line no-magic-numbers
    ])
    // readonly titelGroup = new FormGroup({ homepage: this.homepage })

    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateHomepageComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('homepage', this.homepage)
    }
}
