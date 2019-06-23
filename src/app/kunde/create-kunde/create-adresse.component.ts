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
    form!: FormGroup

    readonly plz = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/^\d{5}$/),
    ])

    readonly ort = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2),
    ])

    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateAdresseComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        // this.form.addControl('plz', this.plz)
        // this.form.addControl('ort', this.ort)

        this.form = new FormGroup({
            ort: this.ort,
            plz: this.plz,
        })
    }
}
