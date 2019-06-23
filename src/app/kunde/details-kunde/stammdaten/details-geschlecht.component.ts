import { Component, Input, OnInit } from '@angular/core'

/**
 * Komponente f&uuml;r das Tag <code>hs-details-isbn</code>
 */
@Component({
    selector: 'kunde-details-geschlecht',
    template: `
        <div class="row mt-2">
            <label class="col col-1"> Geschlecht </label>
            <div class="col col-11">{{ geschlecht }}</div>
        </div>
    `,
})
export class DetailsGeschlechtComponent implements OnInit {
    @Input()
    readonly geschlecht!: string

    ngOnInit() {
        console.log(`DetailsGeschlechtComponent.geschlecht=${this.geschlecht}`)
    }
}
