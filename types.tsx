export interface Food {
  id: number;
  name: string;
  description: string;
  rating: number;
  image: string;
  phoneNumber: string;
  releaseDate: null;
}

export interface Movie {
  id: number;
  name: string;
  description: string;
  rating: number;
  image: string;
  phoneNumber: string;
  releaseDate: Date;
}

export interface Color {
  backgroundColor: string;
  divBackgroundColor: string;
  textColor: string;
  buttonColor: string;
}

export interface Form {
  name: string;
  description: string;
  rating: number;
  image: string;
}
