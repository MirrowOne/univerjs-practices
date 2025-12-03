import { Univer } from "@/src/features/Univer/Univer";


import styles from "./homePage.module.css";
import { ToolBar } from "@/src/features/ToolBar/ToolBar";

export default function HomePage() {
  return (
    <>
      <div className={styles.pageLayout}>
        <ToolBar />
        <Univer />
      </div>
    </>
  );
}
