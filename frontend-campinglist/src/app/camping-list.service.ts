import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface CampingItem {
  id: number;
  name: string;
  isSeparated: boolean;
  amount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CampingListService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getItems(): Observable<CampingItem[]> {
    return this.http.get<CampingItem[]>(this.apiUrl);
  }

  createItem(item: Partial<CampingItem>): Observable<CampingItem> {
    return this.http.post<CampingItem>(this.apiUrl, item);
  }

  updateItem(id: number, item: CampingItem): Observable<CampingItem> {
    return this.http.put<CampingItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Notifica o backend que o item foi separado
  markAsSeparated(id: number): Observable<CampingItem> {
    return this.http.put<CampingItem>(`${this.apiUrl}/${id}/separate`, {});
  }
}
