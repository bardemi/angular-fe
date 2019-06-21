import { LogoComponent } from './logo.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [LogoComponent],
    exports: [LogoComponent],
    imports: [RouterModule],
})
export class LogoModule {}
