import { useFWorksheet, useUniverAPI } from "@/src/store/univerStore";
import { useCallback, useMemo } from "react";
import { columnToLetter } from "@/src/utils/parseToA1Notation";
import { IRange } from "@univerjs/presets";

//  R1
const Range1 = {
  startRow: 0,
  startColumn: 0,
  endRow: 10,
  endColumn: 1,
};

// R2
const Range2 = {
  startRow: 0,
  startColumn: 2,
  endRow: 10,
  endColumn: 1,
};

interface IRuleConfig {
  numberBetween: {
    isActive: boolean;
    range: IRange;
    min: number;
    max: number;
  };
  textLength: {
    isActive: boolean;
    range: IRange;
    min: number;
    max: number;
  };
}

const ruleConfig: IRuleConfig = {
  // aqui se creara un objeto para determinar cuales seran las columnas y rangos que tendran las validaciones
  // desde aqui se moldeara el comportamiento en general de las reglas
  // este objeto debe contener la configuracion de cada regla por separado asi como las columnas que afectan a una u otra regla en conjunto
  numberBetween: {
    isActive: false,
    range: Range1,
    min: 1,
    max: 10,
  },
  textLength: {
    isActive: false,
    range: Range2,
    min: 5,
    max: 10,
  },
};

// mecanismo para detectar si hay solapamiento entre los rangos aplicados
// no impide que se creen las validaciones, solo avisa si hay solapamiento
// pero sienta las bases para poder hacer operaciones previas a la creacion de las validaciones
const parseRuleConfig = (ruleConfig: IRuleConfig) => {
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

export const useValidationsRules = () => {
  const fworksheet = useFWorksheet();
  const univerAPI = useUniverAPI();

  const { numberBetween, textLength } = useMemo(
    () => parseRuleConfig(ruleConfig),
    []
  );

  const numberBetweenRule = useCallback(() => {
    const { range, min, max, isActive } = numberBetween;

    if (!isActive) return;

    const fRange = fworksheet.getRange(range);

    const rule = univerAPI
      ?.newDataValidation()
      .requireNumberBetween(min, max)
      .setOptions({
        // allowBlank: true,
        showErrorMessage: true,
        error: `El valor debe estar entre ${min} y ${max}`,
        errorTitle: "Error de validación",
        errorStyle: univerAPI.Enum.DataValidationErrorStyle.STOP,
      })
      .build();

    fRange.setDataValidation(rule);
  }, [fworksheet, univerAPI, numberBetween]);

  const textLengthRule = useCallback(() => {
    const { range, min, max, isActive } = textLength;

    if (!isActive) return;

    const fRange = fworksheet.getRange(range);

    const affectedColumns = {
      startColumn: columnToLetter(range.startColumn),
      endColumn: columnToLetter(range.endColumn),
    };

    const formula = `=AND(LEN(${affectedColumns.startColumn}1)>=${min}, LEN(${affectedColumns.endColumn}1)<=${max})`;

    const rule = univerAPI
      ?.newDataValidation()
      // 🚀 NUEVA FÓRMULA: Mayor a 5 Y Menor a 10
      .requireFormulaSatisfied(formula)
      .setOptions({
        showErrorMessage: true,
        // Mensaje de error actualizado
        error: `El valor debe tener entre ${min} y ${max} caracteres de longitud`,
        errorTitle: "Error de validación de longitud",
        errorStyle: univerAPI.Enum.DataValidationErrorStyle.STOP,
      })
      .build();

    fRange.setDataValidation(rule);
  }, [fworksheet, univerAPI, textLength]);

  // Create a new data validation rule that requires a number between 1 and 10 fot the range A1:B10
  const initializeRules = () => {
    numberBetweenRule();
    textLengthRule();
  };

  return {
    initializeRules,
  };
};
