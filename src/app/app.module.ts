import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutPageComponent} from './core/layout-page/layout-page.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './core/loader/loader.component';
import {SharedModule} from './shared/shared.module';
import { LoginComponent } from './core/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutPageComponent,
    LoaderComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        HttpClientModule,
        SharedModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
