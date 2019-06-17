import * as moment from 'moment'
import { BASE_URI, KUNDEN_PATH, log } from '../../shared'
import { Kunde, KundeForm, KundeServer } from './kunde'
// Bereitgestellt durch HttpClientModule
// HttpClientModule enthaelt nur Services, keine Komponenten
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http'
import { filter, map } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable
export class KundeService {
    private baseUriKunden: string
    private kundenSubject = new Subject<Array<Kunde>>()
    private kundeSubject = new Subject<Kunde>()
    private errorSubject = new Subject<string | number>()

    /* eslint-disable no-underscore-dangle */
    private _kunde!: Kunde

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain'
    })

    constructor(
        private readonly httpClient: HttpClient,
    ) {
        this.baseUriKunden = `${BASE_URI}/${KUNDEN_PATH}`
        console.log(
            `KundeService.constructor(): baseUriKunde=${this.baseUriKunden}`,
        )
    }
}