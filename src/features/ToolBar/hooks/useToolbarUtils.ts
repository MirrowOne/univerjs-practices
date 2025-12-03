import { sheetDataType } from "@/src/types/sheets-types";
import { useFWorkbook, useFWorksheet, useUniverAPI } from "@/src/store/univerStore";
import { useCallback } from "react";
import { FRange } from "@univerjs/preset-sheets-core";

export const useToolbarUtils = () => {

  const fworksheet = useFWorksheet();
  const fworkbook = useFWorkbook()
  const univerAPI = useUniverAPI();

  const setValues = useCallback(
    (sheetData: sheetDataType) => {
      sheetData?.flatMap((row, index) => {
        Array.from({ length: row.length }, (_, cellIndex) => {
          fworksheet
            ?.getRange({
              startRow: index,
              startColumn: cellIndex,
              endRow: index,
              endColumn: cellIndex,
            })
            .setValue(row[cellIndex]);
        });
      });
    },
    [fworksheet]
  );

  const navigateToCell = useCallback((target: string | FRange) => {
    const fRange = typeof target === 'string'
      ? fworksheet?.getRange(target)
      : target

    const row = fRange?.getRow()
    const column = fRange?.getColumn()

    fworksheet?.setActiveSelection(fRange)
    fworksheet?.scrollToCell(row, column)

  }, [fworksheet]);

  const getSheetStyles = useCallback(() => {
    const frange = fworksheet?.getRange('A1')

    // Aplicar estilos directamente al rango
    // frange?.setBackgroundColor('#2C53F1')
    // frange?.setFontSize(14)
    // frange?.setFontWeight('bold')

    // Si quieres ver los estilos aplicados
    console.table(frange?.getCellStyleData())
  }, [fworksheet])

  return {
    setValues,
    navigateToCell,
    getSheetStyles,
  };
};
