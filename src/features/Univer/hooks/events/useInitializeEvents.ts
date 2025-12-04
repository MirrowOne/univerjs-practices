import { useUniverEvent } from "./core/useUniverEvent";

const useInitializeEvents = () => {
  useUniverEvent("BeforeSheetEditEnd", (params) => {
    const { column, row } = params;
    console.table({ column, row });
  });
};

export default useInitializeEvents;
