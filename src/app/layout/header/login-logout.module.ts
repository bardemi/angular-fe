import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { LoginLogoutComponent } from './login-logout.component'
import { NgModule } from '@angular/core'

@NgModule({
    declarations: [LoginLogoutComponent],
    exports: [LoginLogoutComponent],
    imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class LoginLogoutModule {}
