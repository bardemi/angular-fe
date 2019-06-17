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
import { filter, map, find } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { BasicAuthService } from 'src/app/auth/basic-auth.service';

@Injectable({ providedIn: 'root' })
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

    set kunde(kunde: Kunde) {
        console.log('KundeService.set kunde()', kunde)
        this._kunde = kunde
    }

    @log
    subscribeKunden(next: (kunden: Array<Kunde>) => void) {
        return this.kundenSubject.subscribe(next)
    }

    @log
    subscribeKunde(next: (kunde: Kunde) => void) {
        return this.kundeSubject.subscribe(next)
    }

    @log
    subscribeError(next: (err: string | number) => void) {
        return this.errorSubject.subscribe(next)
    }

    @log
    find(suchkriterien: KundeForm) {
        const params = this.suchkriterienToHttpParams(suchkriterien)
        const uri = this.baseUriKunden
        console.log(`KundeService.find(): uri=${uri}`)

        const errorFn = (err: HttpErrorResponse) => {
            if(err.error instanceof ProgressEvent) {
                console.error('Client-seitiger oder Netzwerkfehler', err.error)
                this.errorSubject.next(-1)
                return
            }

            const { status } = err
            console.log(
                `KundeService.find(): errorFn(): status=${status}, ` +
                    'Response-Body=',
                err.error,
            )
            this.errorSubject.next(status)
        }

        this.httpClient
            .get<Array<KundeServer>>(uri, { params })
            .pipe(
                map(jsonArray =>
                    jsonArray.map(jsonObjekt => Kunde.fromServer(jsonObjekt)),

                )
            )
            .subscribe(kunden => this._kunde.kundenSubject.next(kunden), errorFn)
    }

    @log
    findById(id: string | undefined) {
        // Gibt es einen gepufferten Kunden mit der gesuchten ID und Versionsnr.?
        if (
            this._kunde !== undefined &&
            this._kunde._id === id &&
            this._kunde.version !== undefined
        ) {
            console.log('KundeService.findById(): Kunde gepuffert')
            this.kundeSubject.next(this._kunde)
            return
        }
        if (id === undefined) {
            console.log('KundeService.findById(): Keine Id')
            return
        }

        // Ggf wegen fehlender Versionsnummer (im ETag) nachladen
        const uri = `${this.baseUriKunden}/${id}`

        const errorFn = (err: HttpErrorResponse) => {
            if (err.error instanceof ProgressEvent) {
                console.error(
                    'KundeService.findById(): errorFn(): Client- oder Netzwerkfehler',
                    err.error,
                )
                this.errorSubject.next(-1)
                return
            }

            const { status } = err
            console.log(
                `KundeService.findById(): errorFn(): status=${status}` +
                    `Response-Body=${err.error}`,
            )
            this.errorSubject.next(status)
        }

        console.log('KundeService.findById(): GET-Request')

        let body: KundeServer | null = null
        let etag: string | null = null
        this.httpClient
            .get<KundeServer>(uri, { observe: 'response' })
            .pipe(
                filter(response => {
                    console.debug(
                        'KundeService.findById(): filter(): response=',
                        response,
                    )
                    body = response.body // eslint-disable-line prefer-destructuring
                    return body !== null
                }),
                filter(response => {
                    etag = response.headers.get('ETag')
                    return etag !== null
                }),
                /* eslint-disable @typescript-eslint/no-unused-vars */
                map(_ => {
                    this._kunde = Kunde.fromServer(
                        body as KundeServer,
                        etag as string,
                    )
                    return this._kunde
                }),
                /* eslint-enable @typescript-eslint/no-unused-vars */
            )
            .subscribe(kunde => this.kundeSubject.next(kunde), errorFn)
    }
    /* eslint-enable max-lines-per-function */

    @log
    save(
        neuerKunde: Kunde,
        successFn: (location: string | undefined) => void,
        errorFn: (status: number, errors: { [s: string]: any }) => void,
    ) {
        // Alternative:date-fns
        neuerKunde.datum = moment(new Date())

        const errorFnPost = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'KundeService.save(): errorFnPost(): Client- oder Netzwerkfehler',
                    err.error.message,
                )
            } else if (errorFn === undefined) {
                console.error('errorFnPost', err)
            } else {
                errorFn(err.status, err.error)
            }
        }

        this.httpClient
            .post(this.baseUriKunden, neuerKunde, {
                headers: this.headers,
                observe: 'response',
                responseType: 'text',
            })
            .pipe(
                map(response => {
                    console.debug(
                        'KundeService.save(): map(): response',
                        response,
                    )
                    const { headers } = response
                    let location: string | null | undefined = headers.get(
                        'Location',
                    )
                    if (location === null) {
                        location = undefined
                    }
                    return location
                }),
            )
            .subscribe(location => successFn(location), errorFnPost)
    }

    @log
    update(
        kunde: Kunde,
        successFn: () => void,
        errorFn: (
            status: number,
            errors: { [s: string]: any } | undefined,
        ) => void,
    ) {
        const { version } = kunde
        if (version === undefined) {
            console.error(`Keine Versionsnummer fuer das Kunde ${kunde._id}`)
            return
        }
        const errorFnPut = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'Client-seitiger oder Netzwerkfehler',
                    err.error.message,
                )
            } else if (errorFn === undefined) {
                console.error('errorFnPut', err)
            } else {
                errorFn(err.status, err.error)
            }
        }

        const uri = `${this.baseUriKunden}/${kunde._id}`
        this.headers = this.headers.append('If-Match', version.toString())
        console.log('headers=', this.headers)
        this.httpClient
            .put(uri, kunde, { headers: this.headers })
            .subscribe(successFn, errorFnPut)
    }

    @log
    remove(
        kunde: Kunde,
        successFn: (() => void) | undefined,
        errorFn: (status: number) => void,
    ) {
        const uri = `${this.baseUriKunden}/${kunde._id}`

        const errorFnDelete = (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.error(
                    'Client-seitiger oder Netzwerkfehler',
                    err.error.message,
                )
            } else if (errorFn === undefined) {
                console.error('errorFnPut', err)
            } else {
                errorFn(err.status)
            }
        }

        this.httpClient.delete(uri).subscribe(successFn, errorFnDelete)
    }

    @log
    private suchkriterienToHttpParams(suchkriterien): HttpParams {
        let httpParams = new HttpParams()

        if (suchkriterien.nachname !== undefined && suchkriterien.nachname !=='') {
            httpParams = httpParams.set('nachname', suchkriterien.nachname)
        }
        if (suchkriterien.email !== undefined && suchkriterien.email !=='') {
            httpParams = httpParams.set('email', suchkriterien.email)
        }
        if (suchkriterien.umsatz !== undefined && suchkriterien.umsatz !=='') {
            httpParams = httpParams.set('umsatz', suchkriterien.umsatz)
        }
        if (suchkriterien.homepage !== undefined && suchkriterien.homepage !=='') {
            httpParams = httpParams.set('homepage', suchkriterien.homepage)
        }
        return httpParams
    }
}