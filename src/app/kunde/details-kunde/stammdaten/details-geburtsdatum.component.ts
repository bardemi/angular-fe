import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'kunde-details-geburtsdatum',
    template: `
        <div class="row mt-2">
            <label class="col col-1"> Geburtsdatum </label>
            <div class="col col-11">{{ geburtsdatum }}</div>
        </div>
    `,
})
export class DetailsGeburtsdatumComponent implements OnInit {
    @Input()
    readonly geburtsdatum!: string

    ngOnInit() {
        console.log(
            `DetailsHomepageComponent.geburtsdatum=${this.geburtsdatum}`,
        )
    }
}
