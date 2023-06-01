import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactPageComponent } from './views/contact-page/contact-page.component';
import { ContactEditComponent } from './views/contact-edit/contact-edit.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsComponent } from './views/statistics/statistics.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AppFooterComponent } from './cmps/app-footer/app-footer.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './cmps/chart/chart.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { TransferFundsComponent } from './cmps/transfer-funds/transfer-funds.component';
import { MovesListComponent } from './cmps/moves-list/moves-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactFilterComponent,
   HomePageComponent,
  ContactPageComponent,
  ContactEditComponent,
  ContactDetailsComponent,
  ContactListComponent,
  ContactPreviewComponent,
  StatisticsComponent,
  AppHeaderComponent,
  AppFooterComponent,
  ChartComponent,
  SignUpComponent,
  TransferFundsComponent,
  MovesListComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule, 

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
