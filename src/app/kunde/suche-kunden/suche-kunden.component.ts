import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { log } from '../../shared'

@Component({
    selector: 'kunde-suche-kunden',
    template: `
        <kunde-suchformular (waiting)="setWaiting($event)"></kunde-suchformular>
        <kunde-suchergebnis [waiting]="waiting"></kunde-suchergebnis>
    `,
})
export class SucheKundenComponent implements OnInit {
    waiting!: boolean

    constructor(private readonly titleService: Title) {
        console.log('SucheKundenComponent.constructor()')
    }

    @log
    ngOnInit() {
        this.titleService.setTitle('Suche')
    }

    @log
    setWaiting($event: boolean) {
        this.waiting = $event
    }

    toString() {
        return 'SucheKundenComponent'
    }
}
