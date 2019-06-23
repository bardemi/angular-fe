/* eslint-disable max-lines */

import * as moment from 'moment'
import 'moment/locale/de'

// Alternativen zu Moment
//  https://github.com/date-fns/date-fns
//      https://github.com/date-fns/date-fns/issues/275#issuecomment-264934189
//  https://github.com/moment/luxon
//  https://github.com/iamkun/dayjs

moment.locale('de')

const MIN_KATEGORIE = 0
const MAX_KATEGORIE = 9

export enum Geschlecht {
    MAENNLICH = 'M',
    WEIBLICH = 'W',
    DIVERS = 'D',
}

export enum Familienstand {
    LEDIG = 'L',
    VERHEIRATET = 'VH',
    GESCHIEDEN = 'G',
    VERWITWET = 'VW',
}

export interface Adresse {
    plz: string
    ort: string
}

export interface Umsatz {
    betrag: number
    waehrung: string
}

export interface User {
    username: string
    password: string
}

type UUID = string
/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Buchdaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface KundeShared {
    _id?: UUID
    nachname?: string
    email?: string
    kategorie?: number
    newsletter?: boolean
    geburtsdatum?: Date
    umsatz?: Umsatz
    homepage?: URL
    geschlecht?: Geschlecht
    familienstand?: Familienstand
    interessen?: Array<string>
    adresse?: Adresse
    // username?: string
    // _links?: SelfLink
    // links?: any
    // user: User
    version?: number
}

interface Link {
    rel: string
    href: string
}
/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface KundeServer extends KundeShared {
    interessen?: Array<string>
    links?: Array<Link>
}

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface KundeForm extends KundeShared {
    betrag: number
    waehrung: string
    plz: string
    ort: string
    kategorie: number
    username: string
    password: string
    S?: boolean
    L?: boolean
    R?: boolean
}

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export class Kunde {
    betrag: any
    waehrung: any
    kategorieArray: Array<boolean> = []

    // wird aufgerufen von fromServer() oder von fromForm()
    private constructor(
        // tslint:disable-next-line:variable-name
        public _id: UUID | undefined,
        public nachname: string | undefined,
        public email: string | undefined,
        public kategorie: number | undefined,
        public newsletter: boolean | undefined,
        public geburtsdatum: Date | undefined,
        public umsatz: Umsatz | undefined,
        public homepage: URL | undefined,
        public geschlecht: Geschlecht | undefined,
        public familienstand: Familienstand | undefined,
        public interessen: Array<string> | undefined,
        public adresse: Adresse | undefined,
        public version: number | undefined,
    ) {
        this._id = _id || undefined
        this.nachname = nachname || undefined
        this.email = email || undefined
        this.kategorieArray =
            kategorie === undefined
                ? Array(MAX_KATEGORIE - MIN_KATEGORIE).fill(false)
                : Array(kategorie - MIN_KATEGORIE)
                      .fill(true)
                      .concat(Array(MAX_KATEGORIE - kategorie).fill(false))
        this.newsletter = newsletter || undefined
        this.geburtsdatum = geburtsdatum || undefined
        this.umsatz = umsatz || undefined
        this.homepage = homepage || undefined
        this.geschlecht = geschlecht || undefined
        this.familienstand = familienstand || undefined
        this.interessen =
            interessen === undefined ? [] : (this.interessen = interessen)
        this.adresse = adresse || undefined
        this.version = version || undefined
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param kunde JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Buch-Objekt
     */
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined
        const selfLinkJson = kundeServer.links && kundeServer.links[0]
        if (selfLinkJson !== undefined && selfLinkJson.rel === 'self') {
            selfLink = selfLinkJson.href
        }
        let id: string | undefined
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/')
            id = selfLink.substring(lastSlash + 1)
        }

        let version: number | undefined
        if (etag !== undefined) {
            // Anfuehrungszeichen am Anfang und am Ende entfernen
            const versionStr = etag.substring(1, etag.length - 1)
            version = Number.parseInt(versionStr, 10)
        }
        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.kategorie,
            kundeServer.newsletter,
            kundeServer.geburtsdatum,
            kundeServer.umsatz,
            kundeServer.homepage,
            kundeServer.geschlecht,
            kundeServer.familienstand,
            kundeServer.interessen,
            kundeServer.adresse,
            version        )
        console.log('Kunde.fromServer(): kunde=', kunde)
        return kunde
    }

    /**
     * Ein Buch-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param buch JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Buch-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        const interessen: Array<string> = []
        if (kundeForm.S === true) {
            interessen.push('S')
        }
        if (kundeForm.L === true) {
            interessen.push('L')
        }
        if (kundeForm.R === true) {
            interessen.push('R')
        }

        const umsatz: Umsatz = {
            betrag: kundeForm.betrag,
            waehrung: kundeForm.waehrung,
        }

        const adresse: Adresse = {
            plz: kundeForm.plz,
            ort: kundeForm.ort,
        }

        const kunde = new Kunde(
            kundeForm._id,
            kundeForm.nachname,
            kundeForm.email,
            kundeForm.kategorie,
            kundeForm.newsletter,
            kundeForm.geburtsdatum,
            umsatz,
            kundeForm.homepage,
            kundeForm.geschlecht,
            kundeForm.familienstand,
            interessen,
            adresse,
            kundeForm.version,
        )
        console.log('Kunde.fromForm(): kunde=', kunde)
        return kunde
    }

    /**
     * Abfrage, ob im Buchtitel der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param titel Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Buchtitel enthalten ist. Sonst
     *         false.
     */
    containsTitel(nachname: string) {
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase())
    }

    /**
     * Die Bewertung ("rating") des Buches um 1 erh&ouml;hen
     */
    rateUp() {
        if (this.kategorie !== undefined && this.kategorie < MAX_KATEGORIE) {
            this.kategorie++
        }
    }

    /**
     * Die Bewertung ("rating") des Buches um 1 erniedrigen
     */
    rateDown() {
        if (this.kategorie !== undefined && this.kategorie > MIN_KATEGORIE) {
            this.kategorie--
        }
    }

    /**
     * Abfrage, ob das Buch dem angegebenen Verlag zugeordnet ist.
     * @param verlag der Name des Verlags
     * @return true, falls das Buch dem Verlag zugeordnet ist. Sonst false.
     */
    hasGeschlecht(geschlecht: string) {
        return this.geschlecht === geschlecht
    }

    /**
     * Aktualisierung der Stammdaten des Buch-Objekts.
     * @param nachname Der neue Kundenname
     * @param familienstand Der Familienstand des Kundes
     * @param geschlecht Der Geschlecht (M, W oder D)
     * @param geburtsdatum Das Geburtsdatum
     * @param betrag Der neue Betrag
     * @param waehrung Die Waehrung
     */
    updateStammdaten(
        nachname: string,
        familienstand: Familienstand,
        geschlecht: Geschlecht,
        geburtsdatum: Date | undefined,
        betrag: number,
        waehrung: string,
    ) {
        this.nachname = nachname
        this.familienstand = familienstand
        this.geschlecht = geschlecht
        this.geburtsdatum = geburtsdatum
        this.betrag = betrag
        this.waehrung = waehrung
        this.version = 1
    }

    /**
     * Abfrage, ob es zum Buch auch Schlagw&ouml;rter gibt.
     * @return true, falls es mindestens ein Schlagwort gibt. Sonst false.
     */
    hasInteressen() {
        if (this.interessen === undefined) {
            return false
        }
        return this.interessen.length !== 0
    }

    /**
     * Abfrage, ob es zum Buch das angegebene Schlagwort gibt.
     * @param schlagwort das zu &uuml;berpr&uuml;fende Schlagwort
     * @return true, falls es das Schlagwort gibt. Sonst false.
     */
    hasInteresse(interesse: string) {
        if (this.interessen === undefined) {
            return false
        }
        return this.interessen.includes(interesse)
    }

    /**
     * Aktualisierung der Schlagw&ouml;rter des Buch-Objekts.
     * @param javascript ist das Schlagwort JAVASCRIPT gesetzt
     * @param typescript ist das Schlagwort TYPESCRIPT gesetzt
     */
    updateInteressen(SPORT: boolean, LESEN: boolean, REISEN: boolean) {
        this.resetInteressen()
        if (SPORT) {
            this.addInteresse('S')
        }
        if (LESEN) {
            this.addInteresse('L')
        }
        if (REISEN) {
            this.addInteresse('R')
        }
    }

    /**
     * Konvertierung des Buchobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
    toJSON(): KundeServer {
        return {
            _id: this._id,
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            newsletter: this.newsletter,
            geburtsdatum: this.geburtsdatum,
            umsatz: this.umsatz,
            homepage: this.homepage,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            interessen: this.interessen,
            adresse: this.adresse,
        }
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }

    private resetInteressen() {
        this.interessen = []
    }

    private addInteresse(interesse: string) {
        if (this.interessen === undefined) {
            this.interessen = []
        }
        this.interessen.push(interesse)
    }
}
