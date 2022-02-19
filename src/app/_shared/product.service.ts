import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Product, ProductFilter, ProductFilterOperator } from './product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  public getProducts(filters: ProductFilter[]): Observable<Product[]> {
    const preparedFilters = this.prepareFilters(filters);

    return this.http
      .get<Record<string, Product>>(`${environment.apiUrl}/products.json`)
      .pipe(map((response) => (
        Object
          .values(response)
          .filter((product) => preparedFilters.every((filter) => filter(product)))
      )));
  }

  private prepareFilters(filters: ProductFilter[]): Array<(product: Product) => boolean> {
    return filters.map(({ columnName, operator, value }) => {
      return (product: Product) => {
        switch (operator) {
          case ProductFilterOperator.LessOrEqual: {
            return product[columnName] <= value;
          }
          case ProductFilterOperator.GreaterOrEqual: {
            return product[columnName] >= value;
          }
          case ProductFilterOperator.Equal:
          case ProductFilterOperator.NotEqual:
          case ProductFilterOperator.Contains:
          case ProductFilterOperator.NotContains: {
            let regexString = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            if (operator === ProductFilterOperator.Equal || operator === ProductFilterOperator.NotEqual) {
              regexString = `^${regexString}$`;
            }

            const isMatched = new RegExp(regexString, 'ig').test(String(product[columnName]));

            return (operator === ProductFilterOperator.Equal || operator === ProductFilterOperator.Contains) ?
              isMatched :
              !isMatched;
          }
        }
      };
    });
  }
}

// {id: ProductFilterOperator.LessOrEqual, name: 'Less than or equal'}, // field <= value
// {id: ProductFilterOperator.GreaterOrEqual, name: 'Greater than or equal'}, // field <= value
// {id: ProductFilterOperator.Equal, name: 'Equals'}, // field == value
// {id: ProductFilterOperator.NotEqual, name: 'Does not equal'}, // field != value
// {id: ProductFilterOperator.Contains, name: 'Contains'}, // field.includes(value)
// {id: ProductFilterOperator.NotContains, name: 'Does not contain'}, // !field.includes(value)
