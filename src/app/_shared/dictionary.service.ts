import { Injectable } from '@angular/core';

import { Dictionary } from './dictionary.model';
import { ProductFilterOperator } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  public readonly columnNames: Dictionary = [
    {id: 'product_name', name: 'Name'},
    {id: 'product_desc', name: 'Description'},
    {id: 'category', name: 'Category'},
    {id: 'price', name: 'Price'},
  ];
  public readonly operators: Dictionary = [
    {id: ProductFilterOperator.LessOrEqual, name: 'Less than or equal'}, // field <= value
    {id: ProductFilterOperator.GreaterOrEqual, name: 'Greater than or equal'}, // field <= value
    {id: ProductFilterOperator.Equal, name: 'Equals'}, // field == value
    {id: ProductFilterOperator.NotEqual, name: 'Does not equal'}, // field != value
    {id: ProductFilterOperator.Contains, name: 'Contains'}, // field.includes(value)
    {id: ProductFilterOperator.NotContains, name: 'Does not contain'}, // !field.includes(value)
  ];
}
