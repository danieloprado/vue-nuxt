import { IBanner } from '../interfaces/banner';
import { ISlide } from '../interfaces/slides';
import apiHttp from './api';

export async function slides(): Promise<ISlide[]> {
  return await apiHttp.get('/slides').then(response => response.data);
}

export async function banners(): Promise<IBanner[]> {
  return await apiHttp.get('/banners').then(response => response.data);
}
