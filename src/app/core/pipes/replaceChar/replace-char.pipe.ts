import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceChar',
  standalone: true
})
export class ReplaceCharPipe implements PipeTransform {

  transform(value: string, from: string, to: string): string {
    if (!value || !from || !to) {
      return value; // Devuelve el valor original si alguno de los parámetros es inválido
    }
    return value.replace(new RegExp(from, 'g'), to); // Reemplaza todas las ocurrencias
  }

}
