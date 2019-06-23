import { CreateGeburtsdatumComponent } from './create-geburtsdatum.component'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateGeburtsdatumComponent],
    exports: [CreateGeburtsdatumComponent],
    imports: [ReactiveFormsModule],
})
export class CreateGeburtsdatumModule {}
