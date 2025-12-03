import { sheetDataType } from "@/src/types/sheets-types";
import { useFWorksheet } from "@/src/store/univerStore";
import { useCallback } from "react";

export const useToolbarUtils = () => {
  const fworksheet = useFWorksheet();

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

  return {
    setValues,
  };
};
