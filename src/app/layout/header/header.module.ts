import { HeaderComponent } from './header.component'
import { LogoModule } from './logo.module'
import { NavModule } from './nav.module'
import { NgModule } from '@angular/core'

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [LogoModule, NavModule]
})
export class HeaderModule {}