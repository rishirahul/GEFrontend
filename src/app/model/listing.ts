import {City} from './city';
import {ItemName} from './item-name';
import {Category} from './category';

export interface Listing {
  _id: string;
  name: ItemName;
  image: string;
  category: Category;
  qty: number;
  moisture: number;
  grainCount: number;
  grade: string;
  sampleNo: string;
  city: City;
}
