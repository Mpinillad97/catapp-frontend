import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breed, CatImage } from '../models/cats';

@Injectable({ providedIn: 'root' })
export class CatsApiService {
  private base = '/api';
  constructor(private http: HttpClient) {}

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.base}/breeds`);
  }

  getBreedById(id: string): Observable<Breed> {
    return this.http.get<Breed>(`${this.base}/breeds/${id}`);
  }

  searchBreeds(q: string): Observable<Breed[]> {
    const params = new HttpParams().set('query', q);
    return this.http.get<Breed[]>(`${this.base}/breeds/search`, { params });
  }

  getImagesByBreed(breedId: string, limit = 6): Observable<CatImage[]> {
    const params = new HttpParams().set('breed_id', breedId).set('limit', limit);
    return this.http.get<CatImage[]>(`${this.base}/imagesbybreedid`, { params });
  }
}
