import { Univer } from "@/src/features/Univer/Univer";
import { ToolBar } from "@/src/features/ToolBar/ToolBar";

import styles from "./homePage.module.css";

export default function HomePage() {
  return (
    <>
      <div className={styles.pageLayout}>
        <ToolBar>
          <button>Guardar</button>
        </ToolBar>
        <Univer />
      </div>
    </>
  );
}
