import * as moment from 'moment'
import { Component, VERSION } from '@angular/core'

@Component({
    selector: 'kunde-root',
    templateUrl: './app.component.html',
})

export class AppComponent {
    title = 'kunde'

    constructor() {
        console.log('AppComponent.constructor()')
        console.info(`Angular ${VERSION.full}: Die Webanwendung wird gestartet`)
        // @ts-ignore
        console.info(`Bootstrap ${$.fn.tooltip.Constructor.VERSION}`) // eslint-disable-line no-undef
        console.info(`Moment ${moment.version}`)

        // Testen ob der Browser ES 2019 unterstuetzt, da die funktion flat in aelteren Version nicht funktioniert
        try {
            eval('[0,[1]].flat();') // eslint-disable-line no-eval
        } catch (err) {
            console.error(
                'Browser ist nicht mit ES2019 kompatibel.',
            )
            return
        }
        console.info('Browser unterstuetzt ES2019')
    }
}