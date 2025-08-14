export interface Template {
  id?: number;
  name: string;
  category: string;
  structure: string;
  styles: string;
  isPublic: boolean;
  previewImage?: string; 
  mainColor?: string;
}
