import { HOME_PATH, DETAILS_KUNDE_PATH } from './shared'
import { AdminGuard } from './auth/admin.guard'
import { CreateKundeComponent } from './kunde/create-kunde/create-kunde.component'
import { CreateKundeGuard } from './kunde/create-kunde/create-kunde.guard'
import { DetailsKundeComponent } from './kunde/details-kunde/details-kunde.component'
import { HomeComponent } from './home/home.component'
import { SucheKundenComponent } from './kunde/suche-kunden/suche-kunden.component'
import { UpdateKundeComponent } from './kunde/update-kunde/update-kunde.component'

export const ROUTES = [
    { path: HOME_PATH, component: HomeComponent },
    {
        path: '',
        redirectTo: HOME_PATH,
        pathMatch: 'full',
    },
    {
        path: 'suche',
        component: SucheKundenComponent,
    },
    {
        path: `${DETAILS_KUNDE_PATH}/:id`,
        component: DetailsKundeComponent,
    },
    {
        path: 'update/:id',
        component: UpdateKundeComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'create',
        component: CreateKundeComponent,
        canActivate: [AdminGuard],
        canDeactivate: [CreateKundeGuard],
    },
]
