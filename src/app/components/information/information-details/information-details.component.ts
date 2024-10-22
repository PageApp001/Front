import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Quality, QualityService } from 'src/app/services/services.components/quality.service';

@Component({
  selector: 'app-information-details',
  templateUrl: './information-details.component.html',
  styleUrls: ['./information-details.component.css']
})
export class InformationDetailsComponent  {
  information: any;

  constructor(
    private route: ActivatedRoute,
    private qualityService: QualityService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const informationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadInformationDetails(informationId);
  }

  loadInformationDetails(id: number): void {
    if (id) {
      this.qualityService.getQualityById(id).subscribe(
        (data: any) => {
          this.information = data;
        },
        (error: any) => {
          console.error('Error al obtener los detalles de la información', error);
        }
      );
    }
  }

  transformDescription(description: string): SafeHtml {
    const linkifiedDescription = description.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #3f48cc;">$1</a>');
    return this.sanitizer.bypassSecurityTrustHtml(linkifiedDescription);
  }

}
