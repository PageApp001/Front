import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LinkService } from '../../../services/services.components/link.service';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent implements OnInit {
  linkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private linkService: LinkService,
    public dialogRef: MatDialogRef<AddLinkComponent>
  ) {
    this.linkForm = this.fb.group({
      nombre: [''],
      url: ['']
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.linkForm.valid) {
      const linkData = {
        nombre: this.linkForm.get('nombre')?.value,
        url: this.linkForm.get('url')?.value
      };
  
      this.linkService.createLink(linkData).subscribe(
        (response: any) => {
          console.log('Link creado exitosamente', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating link:', error);
        }
      );
    }
  }
  
}
