import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/services.components/user.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = []; // Aquí almacenamos la lista de usuarios

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers(); // Carga los usuarios automáticamente al iniciar el componente
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data; // Asigna la lista de usuarios obtenida al array 'users'
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
        AlertComponent.showError('Error', 'Error al obtener los usuarios');
      }
    );
  }

  openDialog(user: any = null): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '280px',
      data: {
        user: user ? { ...user } : { nombre: '', apellido: '', cargo: '', dependencia: '', email: '', password: '', role: '' },
        editMode: !!user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (dialogRef.componentInstance.data.editMode) {
          this.updateUser(result);
        } else {
          this.createUser(result);
        }
      }
    });
  }

  createUser(user: any): void {
    this.userService.createUser(user).subscribe(
      () => {
        this.loadUsers();
        AlertComponent.showSuccess('Usuario creado', 'El usuario ha sido creado exitosamente');
      },
      (error) => {
        console.error('Error al crear el usuario:', error);
        AlertComponent.showError('Error', 'Error al crear el usuario');
      }
    );
  }

  updateUser(user: any): void {
    this.userService.updateUser(user.email, user).subscribe(
      () => {
        this.loadUsers();
        AlertComponent.showSuccess('Usuario actualizado', 'El usuario ha sido actualizado exitosamente');
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
        AlertComponent.showError('Error', 'Error al actualizar el usuario');
      }
    );
  }

  deleteUser(email: string): void {
    AlertComponent.showWarning('¿Estás seguro?', '¡No podrás revertir esto!')
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(email).subscribe(
            () => {
              AlertComponent.showSuccess('¡Eliminado!', 'El usuario ha sido eliminado.');
              this.loadUsers(); // Recargar lista de usuarios después de eliminar
            },
            (error) => {
              console.error('Error al eliminar usuario', error);
              AlertComponent.showError('Error', 'Hubo un problema al intentar eliminar el usuario.');
            }
          );
        }
      });
  }
}
