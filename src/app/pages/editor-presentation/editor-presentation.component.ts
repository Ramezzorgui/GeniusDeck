import { Component, OnInit } from '@angular/core';
import { PresentationDataService } from 'src/app/_services/presentation-data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TemplateService, Template } from 'src/app/_services/template.service';
import { ActivatedRoute } from '@angular/router';
import PptxGenJS from "pptxgenjs";



@Component({
  selector: 'app-editor-presentation',
  templateUrl: './editor-presentation.component.html',
  styleUrls: ['./editor-presentation.component.css'],
})
export class EditorPresentationComponent implements OnInit {
  slides: { title: string; content: string[] }[] = [];
  currentSlide = 0;
  isExporting = false;
  templateStyles: { [key: string]: string } = {};
  history: any[] = [];

  showHistory = false;
  selectedFontFamily: string = 'Arial';
  titleFontSize: number = 24;
  contentFontSize: number = 16;

  // Nouvelles variables pour les couleurs
titleColor: string = '#000000';   // noir par défaut
contentColor: string = '#000000'; // noir par défaut

availableFonts: string[] = [
  'Arial', 'Georgia', 'Times New Roman', 'Verdana', 'Courier New'
];
  constructor(
    private presentationDataService: PresentationDataService,
    private templateService: TemplateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Charger slides actuelles
    this.slides = this.presentationDataService.getSlides();

    // Charger historique filtré
    const userData = sessionStorage.getItem('auth-user');
    if (userData) {
      const currentUser = JSON.parse(userData).email;
      const savedPresentations = localStorage.getItem('savedPresentations');
      if (savedPresentations) {
        const allHistory = JSON.parse(savedPresentations);
        this.history = allHistory.filter((p: any) => p.user === currentUser);
      }
    }

    // Vérifier si on charge une présentation existante ou la template choisie
    this.route.queryParams.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.loadPresentationById(id);
      } else {
        this.loadCurrentTemplate(); // toujours charger la template choisie
      }
    });
  }

  /** Charge la template sélectionnée */
  loadCurrentTemplate() {
    const templateId = localStorage.getItem('selectedTemplateId');
    if (templateId) {
      this.templateService.get(+templateId).subscribe({
        next: (template: Template) => {
          this.applyTemplateStyles(template.styles);
        },
        error: (err) => {
          console.error('Erreur récupération template :', err);
          this.templateStyles = {};
        },
      });
    }
  }

  /** Applique les styles de la template */
  applyTemplateStyles(styles: string | { [key: string]: string }) {
    if (typeof styles === 'string') {
      try {
        // Si c'est un objet JSON stringifié
        const parsed = JSON.parse(styles);
        if (typeof parsed === 'object') {
          this.templateStyles = parsed;
          return;
        }
      } catch {
        // Sinon c'est du CSS pur
        let styleTag = document.getElementById('dynamic-template-style');
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.id = 'dynamic-template-style';
          document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = styles;
        this.templateStyles = {};
      }
    } else if (typeof styles === 'object' && styles !== null) {
      this.templateStyles = { ...styles };
    }
  }

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }

  selectSlide(index: number) {
    this.currentSlide = index;
  }

  addPoint() {
  if (!this.slides[this.currentSlide]) {
    this.slides[this.currentSlide] = { title: '', content: [] };
  }
  this.slides[this.currentSlide].content.push('');
}

removePoint(index: number) {
  if (this.slides[this.currentSlide] && this.slides[this.currentSlide].content.length > index) {
    this.slides[this.currentSlide].content.splice(index, 1);
  }
}
updatePoint(value: string, index: number) {
  if (this.slides[this.currentSlide] && this.slides[this.currentSlide].content.length > index) {
    this.slides[this.currentSlide].content[index] = value;
  }
}


  exportAsPDF() {
  const slides = document.querySelectorAll('#presentationToExport > div.slide-export-page');
  if (!slides.length) return;

  this.isExporting = true;
  const pdf = new jsPDF('l', 'mm', 'a4');
  const imgWidth = 297;
  const pageHeight = 210;

  let promises: Promise<void>[] = [];

  slides.forEach((slide, index) => {
    promises.push(
      html2canvas(slide as HTMLElement).then((canvas) => {
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png');

        if (index > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      })
    );
  });

  Promise.all(promises).then(() => {
    pdf.save('presentation.pdf');
    this.isExporting = false;
  });
}

exportCurrentSlideAsImage(format: 'png' | 'jpeg') {
  const slideEl = document.querySelector('.slide-editor') as HTMLElement;
  if (!slideEl) {
    alert('Aucune slide visible à exporter.');
    return;
  }

  this.isExporting = true;

  html2canvas(slideEl, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL(`image/${format}`, 1.0);
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `slide_${this.currentSlide + 1}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.isExporting = false;
    alert(`Slide ${this.currentSlide + 1} exportée en ${format.toUpperCase()} avec succès !`);
  });
}

exportAsPptx(): void {
  let pptx = new PptxGenJS();

  this.slides.forEach((slideData, index) => {
    let slide = pptx.addSlide();

    slide.addText(slideData.title || `Slide ${index + 1}`, {
      x: 0.5,
      y: 0.5,
      w: 9, 
      h: 1,
      fontSize: this.titleFontSize || 32,
      bold: true,
      color: "2F5496", 
      align: "center"
    });

    let pointsText = slideData.content
      .map(point => `• ${point}`)
      .join("\n");

    slide.addText(pointsText, {
      x: 1,
      y: 1.2, 
      w: 8,
      h: 4,
      fontSize: this.contentFontSize || 20,
      color: "000000",
      align: "left",
      bullet: false 
    });
  });

  pptx.writeFile({ fileName: "presentation_office365.pptx" });
}


  savePresentation() {
    const userData = sessionStorage.getItem('auth-user');
    if (!userData) {
      alert('Aucun utilisateur connecté !');
      return;
    }

    const currentUser = JSON.parse(userData).email;
    const currentTemplateId = localStorage.getItem('selectedTemplateId') || null;

    // Si template sélectionnée, on recharge ses styles depuis API avant de sauvegarder
    if (currentTemplateId) {
      this.templateService.get(+currentTemplateId).subscribe({
        next: (template: Template) => {
          this.applyTemplateStyles(template.styles);
          this.finishSavingPresentation(currentUser, currentTemplateId);
        },
        error: () => {
          this.finishSavingPresentation(currentUser, currentTemplateId);
        },
      });
    } else {
      this.finishSavingPresentation(currentUser, null);
    }
  }

  /** Finalise la sauvegarde */
  private finishSavingPresentation(currentUser: string, templateId: string | null) {
    const savedPresentations = localStorage.getItem('savedPresentations');
    let history = savedPresentations ? JSON.parse(savedPresentations) : [];

    const presentationToSave = {
      id: new Date().getTime(),
      slides: this.slides,
      templateId: templateId,
      templateStyles: this.templateStyles,
      savedAt: new Date().toISOString(),
      user: currentUser,
    };

    history.push(presentationToSave);
    localStorage.setItem('savedPresentations', JSON.stringify(history));
    this.history = history.filter((p: any) => p.user === currentUser);

    alert('Présentation sauvegardée avec succès !');
  }

  /** Charge une présentation depuis l'historique */
  loadPresentation(id: number) {
    const savedPresentations = localStorage.getItem('savedPresentations');
    const userData = sessionStorage.getItem('auth-user') || localStorage.getItem('auth-user');

    if (!savedPresentations || !userData) {
      alert('Aucun utilisateur connecté !');
      return;
    }

    const currentUser = JSON.parse(userData).email;
    const history = JSON.parse(savedPresentations);

    const pres = history.find((p: any) => p.id === id && p.user === currentUser);
    if (pres) {
      this.slides = pres.slides;
      this.currentSlide = 0;
      this.applyTemplateStyles(pres.templateStyles || {});
      alert('Présentation chargée !');
      this.toggleHistory();
    } else {
      alert('Aucune présentation trouvée pour cet utilisateur.');
    }
  }

  /** Charge une présentation par ID avec sa template */
  loadPresentationById(id: number) {
    const savedPresentations = localStorage.getItem('savedPresentations');
    if (!savedPresentations) {
      alert('Aucune présentation sauvegardée.');
      return;
    }

    const history = JSON.parse(savedPresentations);
    const pres = history.find((p: any) => p.id === id);
    if (!pres) {
      alert('Présentation non trouvée.');
      return;
    }

    this.slides = pres.slides;
    this.currentSlide = 0;

    if (pres.templateId) {
      this.templateService.get(+pres.templateId).subscribe({
        next: (template: Template) => {
          this.applyTemplateStyles(template.styles);
          localStorage.setItem('selectedTemplateId', pres.templateId);
          alert('Présentation chargée avec sa template spécifique !');
        },
        error: (err) => {
          console.error('Erreur récupération template', err);
          this.applyTemplateStyles(pres.templateStyles || {});
          alert('Présentation chargée, mais erreur récupération template.');
        },
      });
    } else {
      this.applyTemplateStyles(pres.templateStyles || {});
      alert('Présentation chargée avec styles sauvegardés.');
    }
  }

  deletePresentation(id: number) {
  if (!confirm("Voulez-vous vraiment supprimer cette présentation ?")) {
    return;
  }

  const savedPresentations = localStorage.getItem('savedPresentations');
  const userData = sessionStorage.getItem('auth-user') || localStorage.getItem('auth-user');

  if (!savedPresentations || !userData) {
    alert('Aucune présentation trouvée.');
    return;
  }

  const currentUser = JSON.parse(userData).email;
  let history = JSON.parse(savedPresentations);
  history = history.filter((p: any) => !(p.id === id && p.user === currentUser));
  localStorage.setItem('savedPresentations', JSON.stringify(history));
  this.history = history.filter((p: any) => p.user === currentUser);
  alert('Présentation supprimée avec succès !');
}
goBack(): void {
  window.history.back();
}



}
