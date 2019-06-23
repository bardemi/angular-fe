import { Component, OnInit } from '@angular/core'
import { fadeIn, log } from '../shared'
import { Title } from '@angular/platform-browser'

@Component({
    selector: 'kunde-home',
    template: `
        <h1 class="display-1 mt-4" [@fadeIn]="'in'">
            Willkommen auf der Kundenverwaltung Webapp
        </h1>
    `,
    animations: [fadeIn],
})
export class HomeComponent implements OnInit {
    constructor(private readonly title: Title) {
        console.log('HomeComponent.constructor()')
    }

    @log
    ngOnInit() {
        this.title.setTitle('Test')
    }

    toString() {
        return 'HomeComponent'
    }
}
