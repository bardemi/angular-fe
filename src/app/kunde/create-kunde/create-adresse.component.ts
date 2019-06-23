import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
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
    readonly plz: FormControl = new FormControl('76185')
    readonly ort: FormControl = new FormControl('Karlsruhe')
    // readonly emailGroup = new FormGroup({ adresse: this.adresse })

    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateAdresseComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('ort', this.ort)
        this.form.addControl('plz', this.plz)
    }
}
