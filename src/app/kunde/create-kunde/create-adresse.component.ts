import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
    // moduleId: module.id,
    selector: 'kunde-create-adresse',
    templateUrl: './create-adresse.component.html',
})
export class CreateAdresseComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, blur, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly plz: FormControl = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/\d{5}/),
    ])
    readonly ort: FormControl = new FormControl(undefined, [
        Validators.pattern('[A-ZÄÖÜ][a-zäöüß]+'),
        Validators.required,
    ])
    // readonly emailGroup = new FormGroup({ adresse: this.adresse })

    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateAdresseComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('adresse', this.ort)
    }
}
