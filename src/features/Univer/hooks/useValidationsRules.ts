import { useFWorksheet, useUniverAPI } from "@/src/store/univerStore";
import { useCallback } from "react";
import { columnToLetter, toA1Notation } from "@/src/utils/parseToA1Notation";

const RangeAtoB = {
  startRow: 0,
  startColumn: 0,
  endRow: 10,
  endColumn: 1,
};

const RangeCtoD = {
  startRow: 0,
  startColumn: 2,
  endRow: 10,
  endColumn: 3,
};

export const useValidationsRules = () => {
  const fworksheet = useFWorksheet();
  const univerAPI = useUniverAPI();

  const numberBetweenRule = useCallback(() => {
    const fRange = fworksheet.getRange(RangeAtoB);

    const rule = univerAPI
      ?.newDataValidation()
      .requireNumberBetween(1, 10)
      .setOptions({
        // allowBlank: true,
        showErrorMessage: true,
        error: "El valor debe estar entre 1 y 10",
        errorTitle: "Error de validación",
        errorStyle: univerAPI.Enum.DataValidationErrorStyle.STOP,
      })
      .build();

    fRange.setDataValidation(rule);
  }, [fworksheet, univerAPI]);

  const textLengthRule = useCallback(() => {
    if (!univerAPI || !fworksheet) return;

    const fRange = fworksheet.getRange(RangeCtoD);

    const affectedColumns = {
      startColumn: columnToLetter(RangeCtoD.startColumn),
      endColumn: columnToLetter(RangeCtoD.endColumn),
    };

    const formula = `=AND(LEN(${affectedColumns.startColumn}1)>=5, LEN(${affectedColumns.endColumn}1)<=10)`;

    const rule = univerAPI
      ?.newDataValidation()
      // 🚀 NUEVA FÓRMULA: Mayor a 5 Y Menor a 10
      .requireFormulaSatisfied(formula)
      .setOptions({
        showErrorMessage: true,
        // Mensaje de error actualizado
        error: "El valor debe tener entre 5 y 10 caracteres de longitud",
        errorTitle: "Error de validación de longitud",
        errorStyle: univerAPI.Enum.DataValidationErrorStyle.STOP,
      })
      .build();

    fRange.setDataValidation(rule);
  }, [fworksheet, univerAPI]);

  // Create a new data validation rule that requires a number between 1 and 10 fot the range A1:B10
  const initializeRules = () => {
    numberBetweenRule();
    textLengthRule();
  };

  return {
    initializeRules,
  };
};
