import { Component } from '@angular/core'

@Component({
    selector: 'kunde-main',
    template: `
        <main>
            <div class="col col-12 mt-3"><router-outlet></router-outlet></div>
        </main>
    `,
})
export class MainComponent {
    constructor() {
        console.log('MainComponent.constructor()')
    }
}
