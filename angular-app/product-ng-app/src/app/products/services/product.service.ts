import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { response } from 'express';
import { ProductResponse } from '../interfaces/product-response.interface';
import { udapted } from '../../../../../../react-app/src/services/ProductService';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8083/products'; // tu backend

  public findAll(): Observable<Product[]> {
    return this.http.get<ProductResponse>(this.apiUrl).pipe(
      tap(products => console.log('[product service] findAll =>', products)),
      map(response => response._embedded.products as Product[]),
      catchError(err => {
        console.error('[product service] findAll error:', err);
        return of([] as Product[]);
      })
    );
  }

  public findById(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      tap(res => console.log('[ProductService] findById =>', res)),
      catchError(err => {
        console.error('[ProductService] findById error:', err);
        return of(null);
      })
    );
  }

  public create(product: Product): Observable<Product> {
    const { id, ...productWithoutId } = product; // si el bakcend genera el id y no se quiere enviar desde el fronted
    return this.http.post<Product>(this.apiUrl, productWithoutId ).pipe(
      tap(res => console.log('[ProductService] create =>', res)),
      catchError(err => {
        console.error('[ProductService] create error:', err);
        throw err; // Propaga el error
      })
    );

  }

  public update(id: number, product: Product): Observable<Product> {
    if (id != product.id) {
      throw "Operation not allowed"
    }
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(res => console.log('[ProductService] update =>', res)),
      catchError(err => {
        console.error('[ProductService] update error:', err);
        throw err;
      })
    );
  }

  public remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('[ProductService] delete => id:', id)),
      catchError(err => {
        console.error('[ProductService] delete error:', err);
        throw err;
      })
    );
  }
}
