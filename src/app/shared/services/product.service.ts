import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProductList(productName: string = '') {
    return this.http.get(this.apiURL + '/productList').
      pipe(
        map((products: any) => {
          let filteredProducts: any = products;
          if (productName) {
            filteredProducts = [];
            products.forEach((product: any) => {
              if (product.product === productName) {
                filteredProducts.push(product);
              }
            });
          }
          return filteredProducts;
        }), catchError(error => this.handleError(error))
      );
  }

  getNameList(name: string) {
    return this.http.get(this.apiURL + '/nameList').
      pipe(
        map((names: any) => {
          let filteredNames: any = names;
          if (name) {
            filteredNames = [];
            names.forEach((row: any) => {
              if (row.messageName === name) {
                filteredNames.push(row);
              }
            });
          }
          return filteredNames;
        }), catchError(error => this.handleError(error))
      );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
