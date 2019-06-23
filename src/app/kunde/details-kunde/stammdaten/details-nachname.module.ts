import { CommonModule } from '@angular/common'
import { DetailsNachnameComponent } from './details-nachname.component'
import { NgModule } from '@angular/core'

@NgModule({
    declarations: [DetailsNachnameComponent],
    exports: [DetailsNachnameComponent],
    imports: [CommonModule],
})
export class DetailsNachnameModule {}
