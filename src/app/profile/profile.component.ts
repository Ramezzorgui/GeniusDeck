import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service'; // <-- Ajout du service

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  selectedFile: File | null = null;
  uploading = false;
  imageUrl: string | null = null;

  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/du3asbwfc/upload';
  private uploadPreset = 'Generator';

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private userService: UserService // <-- Injection du service
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.imageUrl = this.currentUser?.imageUrl || null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.selectedFile = null;
      return;
    }
    this.selectedFile = input.files[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    this.uploading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', this.uploadPreset);

    this.http.post<any>(this.cloudinaryUrl, formData).subscribe({
      next: (response) => {
        this.uploading = false;
        this.imageUrl = response.secure_url;
        console.log('Image uploaded to Cloudinary:', this.imageUrl);

        // Mise à jour localStorage
        this.currentUser.imageUrl = this.imageUrl;
        this.storageService.saveUser(this.currentUser);

        // 🔁 Mise à jour backend
        if (this.imageUrl) {
          this.userService.updateImageUrl(this.currentUser.id, this.imageUrl).subscribe({
            next: () => {
              console.log('Image URL mise à jour dans la base de données.');
            },
            error: (err) => {
              console.error('Erreur backend lors de la mise à jour de l\'image', err);
            }
          });
        }
      },
      error: (err) => {
        this.uploading = false;
        console.error('Erreur upload image Cloudinary', err);
      }
    });
  }

  
}
