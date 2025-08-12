import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PresentationService, Slide } from 'src/app/_services/presentation.service';
import { PresentationDataService } from 'src/app/_services/presentation-data.service';
import { TemplateService, Template } from 'src/app/_services/template.service';

@Component({
  selector: 'app-create-presentation',
  templateUrl: './create-presentation.component.html',
  styleUrls: ['./create-presentation.component.css']
})
export class CreatePresentationComponent implements OnInit {
  presentation = {
    subject: '',
    duration: '',
    audience: '',
    goal: '',
    keyPoints: '',
    templateId: ''
  };

  parsedStructure: any = null;
  parsedStyles: { [key: string]: string } = {};
  availableTemplates: Template[] = [];
  selectedFile: File | null = null;
  uploadedImageUrl: string = '';
  generatedStructure: Slide[] = [];
  currentSlide: number = 0;

  constructor(
    private presentationService: PresentationService,
    private presentationDataService: PresentationDataService,
    private http: HttpClient,
    private router: Router,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    this.templateService.getAll().subscribe({
      next: (data) => (this.availableTemplates = data),
      error: (err) => console.error('❌ Erreur chargement templates :', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onTemplateChange() {
const selected = this.availableTemplates.find(t => t.id === +this.presentation.templateId);
    if (selected) {
      this.parseTemplate(selected);
    }
  }

  private parseTemplate(template: Template): void {
    try {
      const structureObj = JSON.parse(template.structure || '{}');
      if (Array.isArray(structureObj.sections)) {
        this.parsedStructure = structureObj;
      } else {
        this.parsedStructure = null;
      }

      // Styles éventuels (bonus)
      this.parsedStyles = template.styles ? JSON.parse(template.styles) : {};
    } catch {
      this.parsedStructure = null;
      this.parsedStyles = {};
    }
  }

  onSubmit() {
    if (!this.presentation.templateId) {
      alert("Veuillez choisir un template.");
      return;
    }

    localStorage.setItem('selectedTemplateId', this.presentation.templateId);
    console.log('Template ID stocké :', this.presentation.templateId);

    const formData = {
      subject: this.presentation.subject,
      duration: this.presentation.duration,
      audience: this.presentation.audience,
      goal: this.presentation.goal,
      keyPoints: this.presentation.keyPoints,
      templateId: this.presentation.templateId
    };

    this.presentationService.generateStructure(formData).subscribe({
      next: (structure: Slide[]) => {
        this.generatedStructure = structure;
        this.currentSlide = 0;
        this.presentationDataService.setSlides(structure);
        this.router.navigate(['/edit-presentation']);
      },
      error: (err) => console.error('❌ Erreur génération :', err)
    });
  }

  saveImageAndRedirect() {
    const data = new FormData();
    data.append('image', this.selectedFile!);

    this.http.post<{ filename: string }>('http://localhost:8081/api/presentations/upload-image', data)
      .subscribe({
        next: (res) => {
          this.uploadedImageUrl = `http://localhost:8081/uploads/${res.filename}`;
          console.log('Image enregistrée :', this.uploadedImageUrl);
          this.router.navigate(['/edit-presentation']);
        },
        error: (err) => console.error('Erreur image :', err)
      });
  }

  nextSlide() {
    if (this.currentSlide < this.generatedStructure.length - 1) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goBack(): void {
  window.history.back();
}
}
