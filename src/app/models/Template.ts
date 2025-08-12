export interface Template {
  id?: number;
  name: string;
  category: string;
  structure: string;
  styles: string | { [key: string]: string };
  isPublic: boolean;
  previewImage?: string; 
  mainColor?: string;
  customStyles?: {
    fontFamily?: string;
    titleFontSize?: number;
    contentFontSize?: number;
    titleColor?: string;
    contentColor?: string;
  };
}
