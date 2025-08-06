import { Component, OnInit } from '@angular/core';
import { PresentationDataService } from 'src/app/_services/presentation-data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TemplateService, Template } from 'src/app/_services/template.service';

@Component({
  selector: 'app-saved-presentations',
  templateUrl: './saved-presentation.component.html',
  styleUrls: ['./saved-presentation.component.css']
})
export class SavedPresentationsComponent implements OnInit {
  savedPresentations: any[] = [];
  slides: { title: string; content: string[] }[] = [];
  currentSlide = 0;
  isExporting = false;
  templateStyles: { [key: string]: string } = {};
  history: any[] = [];
  showHistory = false;
  selectedFontFamily: string = "Arial";
  titleFontSize: number = 24;
  contentFontSize: number = 16;

  constructor(
    private presentationDataService: PresentationDataService,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    // 1. Charger une présentation temporaire
    const storedPres = localStorage.getItem('currentPresentation');
    if (storedPres) {
      const loaded = JSON.parse(storedPres);
      this.slides = loaded.slides || [];
      this.templateStyles = loaded.templateStyles || {};
      this.currentSlide = 0;
      localStorage.removeItem('currentPresentation');
      console.log('✅ Présentation chargée depuis localStorage', loaded);
    } else {
      // Sinon, charger les slides en mémoire
      this.slides = this.presentationDataService.getSlides();
      if (this.slides.length === 0) {
        console.warn('⚠️ Aucune slide disponible.');
      }
    }

    // 2. Charger le style du template si disponible
    const templateId = localStorage.getItem('selectedTemplateId');
    if (templateId) {
      this.templateService.get(+templateId).subscribe({
        next: (template: Template) => {
          try {
            this.templateStyles =
              typeof template.styles === 'string'
                ? JSON.parse(template.styles)
                : template.styles || {};
            console.log('✔️ Template CSS appliquée dynamiquement :', this.templateStyles);
          } catch (e) {
            console.error('❌ Erreur parsing styles JSON:', e);
            this.templateStyles = {};
          }
        },
        error: (err) => {
          console.error('❌ Erreur récupération template :', err);
          this.templateStyles = {};
        }
      });
    }

    // 3. Charger les présentations sauvegardées
    const saved = localStorage.getItem('savedPresentations');
    this.history = saved ? JSON.parse(saved) : [];
    this.savedPresentations = this.history;

    console.log("📦 Présentations sauvegardées :", this.savedPresentations);
  }

  // ✅ Charger une présentation spécifique
  loadPresentation(presentation: any) {
    localStorage.setItem('currentPresentation', JSON.stringify(presentation));
    window.location.href = '/edit-presentation';
  }

  // ✅ Supprimer une présentation
  deletePresentation(index: number) {
    this.savedPresentations.splice(index, 1);
    localStorage.setItem('savedPresentations', JSON.stringify(this.savedPresentations));
  }
}
