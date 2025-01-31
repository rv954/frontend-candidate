import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortQuotes',
})
export class SortQuotesPipe implements PipeTransform {
  transform(quotes: { [key: string]: string[] }): {
    [key: string]: string[];
  } {
    if (!quotes) return {};

    return Object.entries(quotes)
      .sort(([keyA], [keyB]) => +keyB - +keyA)
      .reduce((acc, [key, quoteList]) => {
        acc[key] = [...quoteList].sort((a, b) => a.localeCompare(b));
        return acc;
      }, {});
  }
}
