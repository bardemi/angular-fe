import { MainComponent } from './main.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [MainComponent],
    exports: [MainComponent],
    imports: [RouterModule],
})
export class MainModule {}
