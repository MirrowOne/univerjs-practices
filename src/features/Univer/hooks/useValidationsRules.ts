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

    // Create a new data validation rule that requires a number between 1 and 10 fot the range A1:B10
    const initializeRules = () => {
        numberBetweenRule();
    };

    return {
        initializeRules
    }
};
