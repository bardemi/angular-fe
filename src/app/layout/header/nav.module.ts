import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { LoginLogoutModule } from './login-logout.module'
import { NavComponent } from './nav.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [NavComponent],
    exports: [NavComponent],
    imports: [CommonModule, RouterModule, FontAwesomeModule, LoginLogoutModule],
})
export class NavModule {}
