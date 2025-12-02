import styles from "./ToolBar.module.css";

interface ToolBarProps {
  children: React.ReactNode;
}

export const ToolBar = ({ children }: ToolBarProps) => {
  return <section className={styles.toolBarContainer}>{children}</section>;
};
