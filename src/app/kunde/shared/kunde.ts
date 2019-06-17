import 'moment/locale/de'
import * as moment from 'moment'

moment.locale('de')

export enum Geschlecht {
    M = 'MAENNLICH',
    W = 'WEIBLICH',
    D = 'DIVERS',
}

export enum Familienstand {
    L = 'LEDIG',
    VH = 'VERHEIRATET',
    G = 'GESCHIEDEN',
    VW = 'VERWITWET',
}

export enum Interesse {
    S = 'SPORT',
    L = 'LESEN',
    R = 'REISEN',
}

export interface KundeShared {
    _id?: string
    
}