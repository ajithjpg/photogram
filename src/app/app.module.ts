import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {AppRoutes} from '../app/app.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LayoutComponent } from './core/layout/layout.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import {AppState} from '../app/app.service';
import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/authentication.service';
import { RightNavComponent } from './core/right-nav/right-nav.component';
import { LeftNavComponent } from './core/left-nav/left-nav.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    RightNavComponent,
    LeftNavComponent
  ],
  imports: [
    TabsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),
    BsDropdownModule,
    AlertModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [AppState,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
