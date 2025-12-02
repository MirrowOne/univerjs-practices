import { sheetDataType } from "@/src/types/sheets-types";
import { useFWorksheet } from "@/src/store/univerStore";
import { useCallback } from "react";

export const useToolbarUtils = () => {
  const fworksheet = useFWorksheet();

  // se recorren primero las filas
  const setValues = useCallback(
    (sheetData: sheetDataType) => {
      sheetData?.map((row, index) => {
        // y luego se recorre cada celda de la fila
        row.map((cell, cellIndex) => {
          // se setea el valor de la celda
          fworksheet
            ?.getRange({
              startRow: index,
              startColumn: cellIndex,
              endRow: index,
              endColumn: cellIndex,
            })
            .setValue(cell);
        });
      });
    },
    [fworksheet]
  );

  return {
    setValues,
  };
};
