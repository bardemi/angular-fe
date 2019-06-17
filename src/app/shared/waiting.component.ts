import { Component } from '@angular/core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'kunde-waiting',
    template: `
        <div>
            <fa-icon [icon]="faSpinner"></fa-icon>
            <span class="ml-1">
                Bitte warten ...
            </span>
        </div>
    `,
})
export class WaitingComponent {
    readonly faSpinner = faSpinner

    constructor() {
        console.log('WaitingComponent.constructor()')
    }
}
