"use client";
import styles from "./ToolBar.module.css";
import { useToolbarUtils } from "./hooks/useToolbarUtils";
// import { columnToLetter, toA1Notation } from "@/src/utils/parseToA1Notation";

const sheetMockData = [
  [
    "Codprod",
    "Descripción",
    "Existencia",
    "Costo",
    "Precio detal",
    "Precio mayor",
    "Precio distribuidor",
  ],
  ["h1-001", "HARINA PAN 1KG", "40", "0.8", "1.5", "1.3", "1.2"],
  ["h1-002", "ARROZ MARISOL 1KG", "100", "0.7", "1.1", "1.0", "0.9"],
];

// const rangeObject = {
//   startRow: 0,
//   startColumn: 0,
//   endRow: 10,
//   endColumn: 1,
// };

export const ToolBar = () => {
  const { setValues, navigateToCell, getSheetStyles } = useToolbarUtils();

  const handleSetValues = () => {
    setValues(sheetMockData);
  };

  const handleNavigateToCell = () => {
    navigateToCell("A10");
  };

  const handleGetSheetStyles = () => {
    getSheetStyles();
  };

  // const handleToA1Notation = () => {
  //   const a1Notation = toA1Notation(rangeObject);
  //   console.log(a1Notation);
  // };

  // const handleColumnToLetter = () => {
  //   const columnLetter = columnToLetter(rangeObject.startColumn);
  //   console.log(columnLetter);
  // };

  return (
    <section className={styles.toolBarContainer}>
      <button onClick={handleSetValues}>Buscar</button>
      <button onClick={handleNavigateToCell}>Navegar a celda</button>
      <button onClick={handleGetSheetStyles}>Obtener estilos</button>
    </section>
  );
};
