import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
    // moduleId: module.id,
    selector: 'kunde-create-email',
    templateUrl: './create-email.component.html',
})
export class CreateEmailComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly email = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2), // eslint-disable-line no-magic-numbers
        Validators.pattern(/^\w.*$/u),
    ])
    // readonly emailGroup = new FormGroup({ email: this.email })

    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateEmailComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('email', this.email)
    }
}
