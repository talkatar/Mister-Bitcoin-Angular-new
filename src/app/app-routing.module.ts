import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './views/contact-page/contact-page.component'
import { ContactDetailsComponent } from './views/contact-details/contact-details.component'
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { HomePageComponent } from './views/home-page/home-page.component'
import { StatisticsComponent } from './views/statistics/statistics.component'
import { contactResolver } from './services/contact.resolver';
import { SignUpComponent } from './views/sign-up/sign-up.component'

// import { petResolver } from './services/pet.resolver';
// import { authGuard } from './guards/auth-guard';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'contact',
        component: ContactPageComponent,children: [
                    { path: 'edit/:id', component: ContactEditComponent,resolve:{contact:contactResolver}  },
                    { path: 'edit', component: ContactEditComponent }
                ]
    },

    {
        path: 'contact/:id',
        component: ContactDetailsComponent,resolve:{contact:contactResolver}

    },
    {
        path: 'statistics',
        component: StatisticsComponent,

    },
     {
        path: 'signup', component: SignUpComponent, 
    },
    // {
    //     path: '', component: ContactPageComponent, 
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
