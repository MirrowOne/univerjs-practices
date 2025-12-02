"use client";
import { useEffect, useRef } from "react";
import styles from "./Univer.module.css";
import "@univerjs/preset-sheets-core/lib/index.css";
import { useUniverStore } from "@/src/store/univerStore";

export function Univer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { initializeUniver, disposeUniver } = useUniverStore();

  useEffect(() => {
    if (containerRef.current) {
      initializeUniver(containerRef.current);
    }
    return () => {
      disposeUniver();
    };
  }, [initializeUniver, disposeUniver]);

  return <div className={styles.univerRef} ref={containerRef} />;
}
