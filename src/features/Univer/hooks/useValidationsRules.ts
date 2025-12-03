import { sheetDataType } from "@/src/types/sheets-types";
import { useFWorkbook, useFWorksheet, useUniverAPI } from "@/src/store/univerStore";

export const useValidationsRules = () => {
    const fworksheet = useFWorksheet();
    const univerAPI = useUniverAPI();

    // Create a new data validation rule that requires a number between 1 and 10 fot the range A1:B10
    const initializeRules = () => {
        const fRange = fworksheet.getRange('A1:B10')
        const rule = univerAPI?.newDataValidation()
            .requireNumberBetween(1, 10)
            .setOptions({
                // allowBlank: true,
                showErrorMessage: true,
                error: 'El valor debe estar entre 1 y 10',
                errorTitle: 'Error de validación',
            })
            .build();

        fRange.setDataValidation(rule);
    };

    return {
        initializeRules
    }
};
