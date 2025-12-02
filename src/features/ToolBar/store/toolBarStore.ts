import { create } from "zustand";

interface ToolBarActions {
  handleSave: () => void;
  handleGetData: () => void;
}

export const useToolBarStore = create<ToolBarActions>(() => ({
  handleSave: () => console.log("handleSave"),
  handleGetData: () => console.log("handleGetData"),
}));

export const useToolBarHandlers = () => {
  return useToolBarStore((state) => {
    return {
      handleSave: state.handleSave,
      handleGetData: state.handleGetData,
    };
  });
};
