import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserService } from './services/services.components/user.service';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDialogComponent } from './components/admin-dashboard/user-dialog/user-dialog.component';
import { AlertComponent } from './components/alert/alert.component';
import { NewsFormComponent } from './components/news-dashboard/news-form/news-form.component';
import { NewsListComponent } from './components/news-dashboard/news-list/news-list.component';
import { NewsDashboardComponent } from './components/news-dashboard/news-dashboard.component';
import { NewsEditComponent } from './components/news-dashboard/news-edit/news-edit.component';
import { NewsDetailsComponent } from './components/news-dashboard/news-details/news-details.component';
import { CarouselEditComponent } from './components/carousel/carousel-edit/carousel-edit.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddLinkComponent } from './components/link/add-link/add-link.component';
import { LinkComponent } from './components/link/link.component';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';
import { EventFormComponent } from './components/event-dashboard/event-form/event-form.component';
import { EventListComponent } from './components/event-dashboard/event-list/event-list.component';
import { BirthdayImagesComponent } from './components/birthday-images/birthday-images.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    RegistroComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    CarouselComponent,
    AdminDashboardComponent,
    UserDialogComponent,
    AlertComponent,
    NewsFormComponent,
    NewsListComponent,
    NewsDashboardComponent,
    NewsEditComponent,
    NewsDetailsComponent,
    CarouselEditComponent,
    AddLinkComponent,
    LinkComponent,
    EventDashboardComponent,
    EventFormComponent,
    EventListComponent,
    BirthdayImagesComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Posición de las notificaciones
      preventDuplicates: true, // Evita mostrar notificaciones duplicadas
      timeOut: 1500, // Duración predeterminada de las notificaciones (ms)
      enableHtml: true, // Permite HTML en el contenido de las notificaciones
      // Otros ajustes si los necesitas
    }),
    CarouselModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
