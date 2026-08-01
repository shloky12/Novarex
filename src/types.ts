export interface SlideImage {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  tag: string;
}

export interface SpecItem {
  id: string;
  value: string;
  unit: string;
  numericValue: number;
  label: string;
  description: string;
}

export interface DesignFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  details: string[];
}

export interface EngineeringInnovation {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  highlightStat: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Aerodynamics' | 'Details';
  imageUrl: string;
  aspect: string;
}

export interface WhyNovarexItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  stat: string;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  edition: string;
  finish: string;
  comments: string;
}
