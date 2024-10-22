import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertComponent } from '../../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Quality, QualityService } from 'src/app/services/services.components/quality.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-information-lis',
  templateUrl: './information-lis.component.html',
  styleUrls: ['./information-lis.component.css']
})
export class InformationLisComponent implements OnInit {
  informationList: Quality[] = [];
  isAdmin: boolean = false;

  constructor(private qualityService: QualityService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.loadInformationList();
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  loadInformationList(): void {
    this.qualityService.getQuality().subscribe(
      (data: Quality[]) => {
        this.informationList = data;
      },
      (error: any) => {
        console.error('Error al cargar la lista de información', error);
      }
    );
  }
}
