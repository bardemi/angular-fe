import { Component } from '@angular/core'

@Component({
    selector: 'kunde-logo',
    template: `
        <a routerLink="/">
            <img
                src="/assets/img/hs-logo.gif"
                alt="Logo"
                height="60"
                width="337"
            />
        </a>
    `,
})
export class LogoComponent {
    constructor() {
        console.log('LogoComponent.constructor()')
    }
}
