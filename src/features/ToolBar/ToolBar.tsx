"use client";
import styles from "./ToolBar.module.css";
import { useToolbarUtils } from "./hooks/useToolbarUtils";

const sheetMockData = [
  ["Nombre", "Apellido", "Edad"],
  ["Juan", "Perez", "25"],
  ["Maria", "Lopez", "30"],
];

export const ToolBar = () => {
  const { setValues, navigateToCell, getSheetStyles } = useToolbarUtils();

  const handleSetValues = () => {
    setValues(sheetMockData);
  };

  const handleNavigateToCell = () => {
    navigateToCell('A10');
  };

  const handleGetSheetStyles = () => {
    getSheetStyles();
  };

  return (
    <section className={styles.toolBarContainer}>
      <button onClick={handleSetValues}>Buscar</button>
      <button onClick={handleNavigateToCell}>Navegar a celda</button>
      <button onClick={handleGetSheetStyles}>Obtener estilos</button>
    </section>
  );
};
