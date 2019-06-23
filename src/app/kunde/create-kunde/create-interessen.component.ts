import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
    selector: 'kunde-create-interessen',
    templateUrl: './create-interessen.component.html',
})
export class CreateInteressenComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    readonly lesen: FormControl = new FormControl(false)

    ngOnInit() {
        console.log('CreateInteressenComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('interessen', this.lesen)
    }
}
