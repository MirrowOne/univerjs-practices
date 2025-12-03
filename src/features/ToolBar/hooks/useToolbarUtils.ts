import { sheetDataType } from "@/src/types/sheets-types";
import { useFWorkbook, useFWorksheet } from "@/src/store/univerStore";
import { useCallback } from "react";
import { FRange } from "@univerjs/preset-sheets-core";

export const useToolbarUtils = () => {
  const fworksheet = useFWorksheet();
  const fworkbook = useFWorkbook()

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
    console.table(fworksheet?.getDefaultStyle())
  }, [fworksheet])

  return {
    setValues,
    navigateToCell,
    getSheetStyles,
  };
};
