import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args && Array.isArray(value)) {
      let filterKeys = Object.keys(args);

      return value.filter(item => {
        return filterKeys.some((keyName) => {
          return new RegExp(args[keyName], 'gi').test(item[keyName]) || args[keyName] === "";
        });
      });
    } else {
      return value;
    }
  }
}
