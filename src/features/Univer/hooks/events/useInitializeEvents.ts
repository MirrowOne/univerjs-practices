import { useUniverEvent } from "./core/useUniverEvent";

const useInitializeEvents = () => {
  // evento para capturar datos antes de que se edite la celda
  useUniverEvent("BeforeSheetEditEnd", (params) => {
    const { column, row } = params;
    console.table({ column, row });
  });

  // evento para capturar datos antes de que se copie
  useUniverEvent("BeforeClipboardPaste", (params) => {
    console.table({ params });
  });
};

export default useInitializeEvents;
