import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service'
import { Component, OnInit } from '@angular/core'
import {
    faBook,
    faChartBar,
    faChartLine,
    faChartPie,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { log } from '../../shared'

@Component({
    selector: 'kunde-nav',
    templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
    isAdmin!: boolean

    readonly faBook = faBook
    readonly faChartBar = faChartBar
    readonly faChartLine = faChartLine
    readonly faChartPie = faChartPie
    readonly faSearch = faSearch

    constructor(private readonly authService: AuthService) {
        console.log('NavComponent.constructor()')
    }

    @log
    ngOnInit() {
        this.isAdmin = this.authService.isAdmin()
        this.subscribeIsAdmin()
    }

    toString() {
        return 'NavComponent'
    }

    private subscribeIsAdmin() {
        const next = (event: Array<string>) => {
            this.isAdmin = event !== undefined && event.includes(ROLLE_ADMIN)
            console.log('NavComponent.isAdmin:', this.isAdmin)
        }
        this.authService.subscribeRollen(next)
    }
}
