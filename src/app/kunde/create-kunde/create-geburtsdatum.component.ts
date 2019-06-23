import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'kunde-create-geburtsdatum',
    templateUrl: './create-geburtsdatum.component.html',
})
export class CreateGeburtsdatumComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    readonly geburtsdatum = new FormControl('12.06.2019')

    readonly faExclamationCircle = faExclamationCircle

    ngOnInit() {
        console.log('CreateGeburtsdatumComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('geburtsdatum', this.geburtsdatum)
    }
}
