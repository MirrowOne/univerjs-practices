// store/univerStore.ts
import { create } from "zustand";
import {
  createUniver,
  LocaleType,
  mergeLocales,
  FUniver,
  Univer,
} from "@univerjs/presets";
import {
  FWorkbook,
  FWorksheet,
  UniverSheetsCorePreset,
} from "@univerjs/preset-sheets-core";
import { UniverSheetsDataValidationPreset } from "@univerjs/preset-sheets-data-validation";
import UniverPresetSheetsDataValidationEnUS from '@univerjs/preset-sheets-data-validation/locales/en-US'
import UniverPresetSheetsCoreEnUS from "@univerjs/preset-sheets-core/locales/en-US";
import '@univerjs/preset-sheets-data-validation/lib/index.css'

interface UniverState {
  univer?: Univer;
  univerAPI?: FUniver;
  fworkbook: FWorkbook;
  fworksheet: FWorksheet;
  isInitialized: boolean;
  initializeUniver: (container: HTMLDivElement) => void;
  disposeUniver: () => void;
  // Puedes añadir más estados y acciones relacionadas con Univer, e.g.,
  // toggleDarkMode: (isDark: boolean) => void;
}

export const useUniverStore = create<UniverState>((set, get) => ({
  univer: undefined,
  univerAPI: undefined,
  fworkbook: {} as FWorkbook,
  fworksheet: {} as FWorksheet,
  isInitialized: false,

  initializeUniver: (container: HTMLDivElement) => {
    // Evita inicializar si ya está hecho
    if (get().isInitialized) {
      return;
    }

    const { univerAPI, univer } = createUniver({
      locale: LocaleType.EN_US,
      locales: {
        [LocaleType.EN_US]: mergeLocales(UniverPresetSheetsCoreEnUS, UniverPresetSheetsDataValidationEnUS),
      },
      presets: [
        UniverSheetsCorePreset({
          container: container,
          // Puedes añadir otras configuraciones aquí
        }),
        UniverSheetsDataValidationPreset({
          // Whether to display the edit button in the drop-down menu
          showEditOnDropdown: true,
        })
      ],
    });

    // Crear un libro de trabajo inicial (opcionalmente)
    univerAPI.createWorkbook({});
    univerAPI.toggleDarkMode(true);

    set({
      univer,
      univerAPI,
      fworkbook: univerAPI.getActiveWorkbook() as FWorkbook,
      fworksheet: univerAPI.getActiveWorkbook()?.getActiveSheet() as FWorksheet,
      isInitialized: true,
    });

    console.log("Univer Inicializado y guardado en Zustand Store.");
  },

  disposeUniver: () => {
    const { univerAPI } = get();
    if (univerAPI) {
      univerAPI.dispose();
      console.log("Univer Disposed.");
    }
    set({
      univer: undefined,
      univerAPI: undefined,
      fworkbook: {} as FWorkbook,
      fworksheet: {} as FWorksheet,
      isInitialized: false,
    });
  },
}));

// Exporta una acción para usar el API fácilmente en otros componentes
export const useUniverAPI = () => useUniverStore((state) => state.univerAPI);
export const useUniver = () => useUniverStore((state) => state.univer);
export const useFWorkbook = () => useUniverStore((state) => state.fworkbook);
export const useFWorksheet = () => useUniverStore((state) => state.fworksheet);
