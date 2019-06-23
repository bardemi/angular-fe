import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'kunde-details-email',
    template: `
        <div class="row mt-2">
            <label class="col col-1"> Email </label>
            <div class="col col-11">{{ email }}</div>
        </div>
    `,
})
export class DetailsEmailComponent implements OnInit {
    @Input()
    readonly email!: string

    ngOnInit() {
        console.log(`DetailsEmailComponent.email=${this.email}`)
    }
}
