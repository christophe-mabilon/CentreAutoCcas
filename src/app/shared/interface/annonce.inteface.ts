export interface Annonce {
  id: number;
  brand: any;
  primeEco: boolean;
  topOcass: boolean;
  model: any;
  modelComplement: string;
  modelComplement2: string;
  year?: number;
  yearMin?: number;
  yearMax?: number;
  kilometre?: number;
  kilometreMin?: number;
  kilometreMax?: number;
  price?:number;
  priceMin?: number;
  priceMax?:number;
  power?:number;
  powerMin?:number;
  powerMax?:number;
  fuel: string;
  places:number;
  typeOfVehicle:string;
  gearbox: string;
  carDoors: number;
  description: string;
  region: string;

  photos: any;
  date: Date;
  garage: number;
  user:number;
}
