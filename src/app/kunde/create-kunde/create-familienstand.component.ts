import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
    selector: 'kunde-create-familienstand',
    templateUrl: './create-familienstand.component.html',
})
export class CreateFamilienstandComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    readonly familienstand = new FormControl('L')

    ngOnInit() {
        console.log('CreateFamilienstandComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('familienstand', this.familienstand)
    }
}
