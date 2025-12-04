"use client";
import styles from "./ToolBar.module.css";
import { useToolbarUtils } from "./hooks/useToolbarUtils";
// import { columnToLetter, toA1Notation } from "@/src/utils/parseToA1Notation";

const sheetMockData = [
  ["Nombre", "Apellido", "Edad"],
  ["Juan", "Perez", "25"],
  ["Maria", "Lopez", "30"],
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
