import { ActivatedRoute, Params } from '@angular/router'
import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service'
import { Component, OnInit } from '@angular/core'
import { HttpStatus, log } from '../../shared'
import { Kunde } from '../shared/kunde'
import { KundeService } from '../shared/kunde.service'
import { Title } from '@angular/platform-browser'

/**
 * Komponente f&uuml;r das Tag <code>hs-details-buch</code>
 */
@Component({
    selector: 'kunde-details-kunde',
    templateUrl: './details-kunde.component.html',
})
export class DetailsKundeComponent implements OnInit {
    waiting = true
    kunde: Kunde | undefined
    errorMsg: string | undefined
    isAdmin!: boolean

    // eslint-disable-next-line max-params
    constructor(
        private kundeService: KundeService,
        private titleService: Title,
        private route: ActivatedRoute,
        private authService: AuthService,
    ) {
        console.log('DetailsKundeComponent.constructor()')
    }

    @log
    ngOnInit() {
        // Die Beobachtung starten, ob es ein zu darzustellendes Buch oder
        // einen Fehler gibt.
        this.subscribeKunde()
        this.subscribeError()

        // Pfad-Parameter aus /detailsBuch/:id
        // UUID (oder Mongo-ID) ist ein String
        const next = (params: Params) => {
            console.log('params=', params)
            this.kundeService.findById(params.id)
        }
        // ActivatedRoute.params ist ein Observable
        this.route.params.subscribe(next)

        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.isAdmin = this.authService.isAdmin()
        this.subscribeIsAdmin()
    }

    toString() {
        return 'DetailsKundeComponent'
    }

    private subscribeKunde() {
        const next = (kunde: Kunde) => {
            this.waiting = false
            this.kunde = kunde
            console.log('DetailsKundeComponent.kunde=', this.kunde)

            const titel =
                this.kunde === undefined
                    ? 'Details'
                    : `Details ${this.kunde._id}`
            this.titleService.setTitle(titel)
        }
        this.kundeService.subscribeKunde(next)
    }

    private subscribeError() {
        const next = (err: string | number | undefined) => {
            this.waiting = false
            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.'
                return
            }

            if (typeof err === 'string') {
                this.errorMsg = err
                return
            }

            this.errorMsg =
                err === HttpStatus.NOT_FOUND
                    ? 'Kein Kunde gefunden.'
                    : 'Ein Fehler ist aufgetreten.'
            console.log(`DetailsKundeComponent.errorMsg: ${this.errorMsg}`)

            this.titleService.setTitle('Fehler')
        }

        this.kundeService.subscribeError(next)
    }

    private subscribeIsAdmin() {
        const next = (event: Array<string>) => {
            this.isAdmin = event.includes(ROLLE_ADMIN)
            console.log('DetailsBuchComponent.isAdmin:', this.isAdmin)
        }
        this.authService.subscribeRollen(next)
    }
}
