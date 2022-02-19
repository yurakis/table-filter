export interface Product {
  id: 1;
  product_name: string;
  product_desc: string;
  price: string;
  currency: string;
  category: string;
}

export enum ProductFilterOperator {
  LessOrEqual = 'less_or_equal',
  GreaterOrEqual = 'greater_or_equal',
  Equal = 'equal',
  NotEqual = 'not_equal',
  Contains = 'contains',
  NotContains = 'not_contains',
}

export interface ProductFilter {
  columnName: keyof Product;
  operator: ProductFilterOperator;
  value: string;
}

