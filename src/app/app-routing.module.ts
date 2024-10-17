import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guards/AdminGuard';
import { NewsListComponent } from './components/news-dashboard/news-list/news-list.component';
import { NewsFormComponent } from './components/news-dashboard/news-form/news-form.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselEditComponent } from './components/carousel/carousel-edit/carousel-edit.component';
import { NewsDetailsComponent } from './components/news-dashboard/news-details/news-details.component';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';
import { EventListComponent } from './components/event-dashboard/event-list/event-list.component';
import { InformationComponent } from './components/information/information.component';
import { MisionComponent } from './components/mision/mision.component';
import { VisionComponent } from './components/vision/vision.component';
import { ValoresComponent } from './components/valores/valores.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { PoliticasComponent } from './components/politicas/politicas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'login',
    component: InicioComponent,
  },
  {
    path: 'signin',
    component: RegistroComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'list-news',
    component: NewsListComponent,
  },
  {
    path: 'news/:id',
    component: NewsDetailsComponent,
  },
  {
    path: 'create-news',
    component: NewsFormComponent,
  },
  {
    path: 'edit-news/:id',
    component: NewsFormComponent,
  },
  {
    path: 'details-news',
    component: NewsDetailsComponent,
  },
  {
    path: 'carousel',
    component: CarouselComponent,
  },
  {
    path: 'edit-carousel',
    component: CarouselEditComponent,
  },
  {
    path: 'event-dashboard',
    component: EventDashboardComponent,
  },
  {
    path: 'information',  // Nueva ruta para InformationComponent
    component: InformationComponent,
  },
  { path: 'mision', component: MisionComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'valores', component: ValoresComponent },
  { path: 'mapa', component: MapaComponent },

  { path: 'politicas', component: PoliticasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
