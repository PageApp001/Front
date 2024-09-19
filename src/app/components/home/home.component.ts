import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { BirthdaylService } from 'src/app/services/services.components/birthday.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  isEditor: boolean = false;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationService.showNotification;
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
    this.isEditor = userRole === 'editor';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
