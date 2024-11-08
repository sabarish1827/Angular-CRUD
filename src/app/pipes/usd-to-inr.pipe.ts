import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usdToInr'
})
export class UsdToInrPipe implements PipeTransform {
  transform(value: number): number {
    const conversionRate = 82;
    return value * conversionRate;
  }
}
