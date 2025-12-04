import { useFWorksheet, useUniverAPI } from "@/src/store/univerStore";
import { useCallback } from "react";
import { columnToLetter } from "@/src/utils/parseToA1Notation";
import { IRuleConfig } from "../types/univerConfig";
import { useUniverConfigStore } from "../store/useUniverConfig";

export const useValidationsRules = () => {
  const { getRuleConfig } = useUniverConfigStore();
  const ruleConfig = getRuleConfig();
  const fworksheet = useFWorksheet();
  const univerAPI = useUniverAPI();

  const { numberBetween, textLength } = ruleConfig as IRuleConfig;

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
