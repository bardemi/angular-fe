import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
    selector: 'kunde-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    readonly geschlecht = new FormControl('WEIBLICH')

    ngOnInit() {
        console.log('CreateGeschlechtComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('geschlecht', this.geschlecht)
    }
}