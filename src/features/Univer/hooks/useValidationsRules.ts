import { useFWorksheet, useUniverAPI } from "@/src/store/univerStore";
import { useCallback } from "react";

export const useValidationsRules = () => {
    const fworksheet = useFWorksheet();
    const univerAPI = useUniverAPI();

    const numberBetweenRule = useCallback(() => {
        const fRange = fworksheet.getRange('A1:B10')
        const rule = univerAPI?.newDataValidation()
            .requireNumberBetween(1, 10)
            .setOptions({
                // allowBlank: true,
                showErrorMessage: true,
                error: 'El valor debe estar entre 1 y 10',
                errorTitle: 'Error de validación',
                errorStyle: univerAPI.Enum.DataValidationErrorStyle.STOP
            })
            .build();

        fRange.setDataValidation(rule);
    }, [fworksheet, univerAPI]);

    const textLengthRule = useCallback(() => {
        if (!univerAPI || !fworksheet) return;

        const fRange = fworksheet.getRange('C1:C10');

        // 1. Definir la fórmula como una cadena de texto
        // Usamos RC (Relative Column/Row) para referirnos a la celda actual dentro del rango
        const formula = '=AND(LEN(RC)>=5, LEN(RC)<=10)';

        // 2. Crear la regla usando requireFormulaSatisfied
        const rule = univerAPI.newDataValidation()
            .requireFormulaSatisfied(
                // La validación se cumple si la fórmula es TRUE
                formula
            )
            .setOptions({
                showErrorMessage: true,
                error: '⛔ La longitud del texto debe estar entre 5 y 10 caracteres (Usando Fórmula).',
                errorTitle: 'Error de Longitud (Fórmula)',
                errorStyle: univerAPI.Enum.DataValidationErrorStyle.STOP
            })
            .build();

        // 3. Aplicar la regla
        fRange.setDataValidation(rule);
    }, [fworksheet, univerAPI]);

    // Create a new data validation rule that requires a number between 1 and 10 fot the range A1:B10
    const initializeRules = () => {
        numberBetweenRule();
        textLengthRule();
    };

    return {
        initializeRules
    }
};
