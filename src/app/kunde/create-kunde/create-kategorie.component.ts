import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
    selector: 'kunde-create-kategorie',
    templateUrl: './create-kategorie.component.html',
})
export class CreateKategorieComponent implements OnInit {
    @Input()
    readonly form!: FormGroup

    readonly kategorie: FormControl = new FormControl(1)

    ngOnInit() {
        console.log('CreateKategorieComponent.ngOnInit')
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.form.addControl('kategorie', this.kategorie)
    }
}
