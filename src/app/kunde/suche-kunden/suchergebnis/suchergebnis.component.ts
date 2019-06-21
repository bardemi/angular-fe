/* eslint-disable max-classes-per-file */

import { Component, Input, OnInit } from '@angular/core'
import {
    DETAILS_KUNDE_PATH,
    HttpStatus,
    easeIn,
    easeOut,
    log,
} from '../../../shared'
import {
    faFolderOpen,
    faInfoCircle,
    faSearchPlus,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from '../../../auth/auth.service'
import { Kunde } from '../../shared/kunde'
import { KundeService } from '../../shared/kunde.service'
import { NgLocalization } from '@angular/common'
import { Router } from '@angular/router'

@Component({
    selector: 'kunde-suchergebnis',
    templateUrl: './suchergebnis.component.html',
    animations: [easeIn, easeOut],
})
export class SuchergebnisComponent implements OnInit {
    @Input()
    waiting!: boolean

    kunden: Array<Kunde> = []
    errorMsg: string | undefined
    isAdmin!: boolean

    readonly faFolderOpen = faFolderOpen
    readonly faInfoCircle = faInfoCircle
    readonly faSearchPlus = faSearchPlus
    readonly faTrash = faTrash

    constructor(
        private readonly kundeService: KundeService,
        private readonly router: Router,
        private readonly authService: AuthService,
    ) {
        console.log('SuchergebnisComponent.constructor()')
    }

    @log
    ngOnInit() {
        this.subscribeKunden()
        this.subscribeError()
        this.isAdmin = this.authService.isAdmin()
    }

    @log
    onSelect(kunde: Kunde) {
        this.router.navigate([DETAILS_KUNDE_PATH, kunde._id])
    }

    @log
    onRemove(kunde: Kunde) {
        const successFn: (() => void) | undefined = undefined
        const errorFn = (status: number) =>
            console.error(`Fehler beim Loeschen: status=${status}`)
        this.kundeService.remove(kunde, successFn, errorFn)
        if (this.kunden.length) {
            this.kunden = this.kunden.filter((k: Kunde) => k._id !== kunde._id)
        }
    }

    toString() {
        return 'SuchergebnisComponent'
    }

    private subscribeKunden() {
        const next = (kunden: Array<Kunde>) => {
            this.waiting = false
            this.errorMsg = undefined

            this.kunden = kunden
            console.log(
                'SuchErgebnisComponent.subscribeKunden: this.kunden=',
                this.kunden,
            )
        }
        this.kundeService.subscribeKunden(next)
    }

    private subscribeError() {
        const next = (err: string | number | undefined) => {
            // zuruecksetzen
            this.waiting = false
            this.kunden = []

            console.log('SuchErgebnisComponent.subscribeError: err=', err)
            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.'
                return
            }

            if (typeof err === 'string') {
                this.errorMsg = err
                return
            }

            switch (err) {
                case HttpStatus.NOT_FOUND:
                    this.errorMsg = 'Keine Kunden gefunden.'
                    break
                default:
                    this.errorMsg = 'Ein Fehler ist aufgetreten.'
                    break
            }
            console.log(`SuchErgebnisComponent.errorMsg: ${this.errorMsg}`)
        }

        this.kundeService.subscribeError(next)
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi' // eslint-disable-line no-magic-numbers
    }
}
