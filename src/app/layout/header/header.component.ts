import { Component } from '@angular/core'

@Component({
    selector: 'kunde-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(){
        console.log('HeaderComponent.constructor()')
    }
}