import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportTableToExcel(tableId: string, fileName: string): void {
    // Obtener la tabla HTML
    const element = document.getElementById(tableId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Crear un libro de trabajo (workbook)
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generar el archivo Excel y guardarlo
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}