import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { BirthdaylService } from 'src/app/services/services.components/birthday.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin: boolean = false
  isEditor: boolean = false

  imagenes: { imagen: string }[] = [];   

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private birthdayService: BirthdaylService,
  ) { }

  ngOnInit(): void {

    this.notificationService.showNotification
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
    this.isEditor = userRole === 'editor';
    this.loadBirthday();

  }

  loadBirthday() {
    this.birthdayService.getBirthdayImages().subscribe((data) => {
      if (Array.isArray(data)) {
        this.imagenes = data;  
      } else {
        console.error('La respuesta no es un array:', data);
      }
    });
  }

  getImageUrl(imageName: string): string {
    return `http://localhost:3000/uploads/${imageName}`;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}