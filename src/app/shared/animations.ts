import { animate, state, style, transition, trigger } from '@angular/animations'

export const easeIn = trigger('easeIn', [
    state('active', style({ transform: 'translateX(0)' })),
    transition(':enter', [
        style({
            transform: 'translateX(-100%)',
            opacity: 0,
        }),
        animate('0.5s ease-in'),
    ]),
])

export const easeOut = trigger('easeOut', [
    transition(':leave', [
        // Ende nach 0.5s und ganz rechts
        animate(
            '0.5s ease-out',
            style({
                transform: 'translateX(100%)',
                opacity: 0,
            }),
        ),
    ]),
])

// to fade in = einblenden
export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        // Start: zunaechst unsichtbar
        style({ opacity: 0 }),
        // Ende nach 0.3s bei voller Sichtbarkeit
        animate('0.3s', style({ opacity: 1 })),
    ]),
])
