import { IRange } from "@univerjs/presets";

/**
 * Convierte un índice de columna (0-basado) a su representación en letras A1
 * (ej. 0 -> A, 25 -> Z, 26 -> AA).
 * @param columnIndex - Índice de la columna (0, 1, 2, ...).
 * @returns La notación de columna en letras.
 */
export function columnToLetter(columnIndex: number): string {
  let letter = "";
  // La notación A1 comienza en 1, así que ajustamos el índice
  let temp = columnIndex + 1;

  while (temp > 0) {
    // Calculamos el resto para obtener la posición de la letra (A=0, B=1, ...)
    const remainder = (temp - 1) % 26;
    // 65 es el código ASCII para 'A'
    letter = String.fromCharCode(65 + remainder) + letter;
    // Movemos al siguiente grupo de 26
    temp = Math.floor((temp - 1) / 26);
  }

  return letter;
}

/**
 * Convierte un objeto de coordenadas de rango (0-basadas) a una string
 * en notación A1 (ej. "A1:B11").
 * @param coords - El objeto de coordenadas.
 * @returns El rango en notación A1.
 */
export function toA1Notation(coords: IRange): string {
  const { startRow, startColumn, endRow, endColumn } = coords;

  // --- 1. Celda de inicio ---
  const startColLetter: string = columnToLetter(startColumn);
  // Se suma 1 a la fila porque la notación A1 es 1-basada
  const startRowNumber: number = startRow + 1;
  const startCell: string = `${startColLetter}${startRowNumber}`;

  // --- 2. Celda final ---
  const endColLetter: string = columnToLetter(endColumn);
  const endRowNumber: number = endRow + 1;
  const endCell: string = `${endColLetter}${endRowNumber}`;

  // --- 3. Formateo del rango ---
  if (startCell === endCell) {
    // Si el inicio y el fin son la misma celda (rango de 1x1)
    return startCell;
  } else {
    // Es un rango
    return `${startCell}:${endCell}`;
  }
}

// Objeto de prueba:
// const rangeObject: IRange = {
//   startRow: 0,
//   startColumn: 0,
//   endRow: 10,
//   endColumn: 1,
// };

// Ejecución
// const a1String: string = toA1Notation(rangeObject);

// console.log(`Objeto de entrada:`, rangeObject);
// console.log(`Notación A1 resultante: **${a1String}**`);

// Ejemplo adicional para probar la conversión de columna a letra:
// console.log(`Columna 25 (Z): ${columnToLetter(25)}`);
// console.log(`Columna 26 (AA): ${columnToLetter(26)}`);
