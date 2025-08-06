import { Component, OnInit } from '@angular/core';
import { Template, TemplateService } from '../_services/template.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  form: Template = {
    name: '',
    category: '',
    structure: '',
    styles: '',
    isPublic: false
  };

  isEdit = false;

  constructor(
    private service: TemplateService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.get(+id).subscribe((data) => (this.form = data));
    }
  }

  // <-- Place cette fonction directement dans la classe, avant onSubmit()
  private validateStructureContent(structureStr: string): boolean {
    try {
      const structure = JSON.parse(structureStr);
      if (!Array.isArray(structure.sections)) return false;
      for (const section of structure.sections) {
        if (typeof section.content !== 'string') return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  // Modifie ta méthode onSubmit() comme suit :
  onSubmit(): void {
    // Valide que chaque section a bien 'content'
    if (!this.validateStructureContent(this.form.structure)) {
      alert("Chaque section de la structure doit contenir un champ 'content' de type chaîne.");
      return;
    }

    try {
      JSON.parse(this.form.structure || '{}');
    } catch {
      alert('La structure doit être un JSON valide.');
      return;
    }

    try {
      if (this.form.styles) JSON.parse(this.form.styles);
    } catch {
      alert('Le champ styles doit être un JSON valide.');
      return;
    }

    if (this.isEdit && this.form.id) {
      this.service.update(this.form.id, this.form).subscribe(() => {
        this.router.navigate(['/templates']);
      });
    } else {
      this.service.create(this.form).subscribe(() => {
        this.router.navigate(['/templates']);
      });
    }
  }

  goBack() {
  this.location.back();
}


  
}
