// mecanismo para detectar si hay solapamiento entre los rangos aplicados
// no impide que se creen las validaciones, solo avisa si hay solapamiento

import { IRuleConfig } from "../types/univerConfig";

// pero sienta las bases para poder hacer operaciones previas a la creacion de las validaciones
export const parseRulesConfig = (ruleConfig: IRuleConfig): IRuleConfig => {
  const { numberBetween, textLength } = ruleConfig;

  // range start 'variable', range end 'variable'
  // desestructuracion para alias para claridad
  const {
    startRow: rangeRS1,
    startColumn: rangeCS1,
    endRow: rangeRE1,
    endColumn: rangeCE1,
  } = numberBetween.range;
  const {
    startRow: rangeRS2,
    startColumn: rangeCS2,
    endRow: rangeRE2,
    endColumn: rangeCE2,
  } = textLength.range;

  // 2. Logica de solapamiento (se colocan las condiciones cuando los rangos se solapan en una direccion)
  // Condicion 1: Solapan en filas (Row Overlap)
  // El fin de R1 esta despues del inicio de R2 y el fin de R2 esta despues del inicio de R1
  const rowsOverlap = rangeRE1 >= rangeRS2 && rangeRE2 >= rangeRS1;

  // Condicion 2: Solapan en columnas (Column Overlap)
  // El fin de R1 esta despues del inicio de R2 y el fin de R2 esta despues del inicio de R1
  const columnsOverlap = rangeCE1 >= rangeCS2 && rangeCE2 >= rangeCS1;

  // Condicion Final: Interseccion (2D Overlap)
  if (rowsOverlap && columnsOverlap) {
    console.error(
      "Las reglas aplicadas a los rangos definidos estan solapados"
    );
    return {
      numberBetween,
      textLength,
    };
  }

  // si no hay un error, el codigo continua aqui
  console.log("Configuración de rangos validada. No hay solapamiento.");

  return {
    numberBetween,
    textLength,
  };
};
