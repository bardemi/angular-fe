import { Component, Input, OnInit } from '@angular/core'
import { Kunde } from '../../shared/kunde'

/**
 * Komponente f&uuml;r das Tag <code>hs-stammdaten</code>
 */
@Component({
    selector: 'kunde-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <hs-details-stammdaten [buch]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunde!: Kunde

    ngOnInit() {
        console.log('DetailsStammdatenComponent.kunde=', this.kunde)
    }
}
