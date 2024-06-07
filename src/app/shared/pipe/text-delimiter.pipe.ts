import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textDelimiter',
  standalone: true
})
export class TextDelimiterPipe implements PipeTransform {

  transform(value: string, limit: number = 3): any {
    if (!value) return '';
    if (value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + '...';
  }

}
