import { Pipe, PipeTransform } from '@angular/core';

import { Dictionary } from './dictionary.model';

@Pipe({
  name: 'dictionaryItemName'
})
export class DictionaryItemNamePipe implements PipeTransform {
  public transform(value: unknown, dictionary: Dictionary): string | undefined {
    return dictionary.find((({ id }) => id === value))?.name;
  }
}
