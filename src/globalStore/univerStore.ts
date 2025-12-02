// store/univerStore.ts
import { create } from "zustand";
import {
  createUniver,
  LocaleType,
  mergeLocales,
  FUniver,
  Univer,
} from "@univerjs/presets";
import { UniverSheetsCorePreset } from "@univerjs/preset-sheets-core";
import UniverPresetSheetsCoreEnUS from "@univerjs/preset-sheets-core/locales/en-US";

interface UniverState {
  univer?: Univer;
  univerAPI?: FUniver;
  isInitialized: boolean;
  initializeUniver: (container: HTMLDivElement) => void;
  disposeUniver: () => void;
  // Puedes añadir más estados y acciones relacionadas con Univer, e.g.,
  // toggleDarkMode: (isDark: boolean) => void;
}

export const useUniverStore = create<UniverState>((set, get) => ({
  univer: undefined,
  univerAPI: undefined,
  isInitialized: false,

  initializeUniver: (container: HTMLDivElement) => {
    // Evita inicializar si ya está hecho
    if (get().isInitialized) {
      return;
    }

    const { univerAPI, univer } = createUniver({
      locale: LocaleType.EN_US,
      locales: {
        [LocaleType.EN_US]: mergeLocales(UniverPresetSheetsCoreEnUS),
      },
      presets: [
        UniverSheetsCorePreset({
          container: container,
          // Puedes añadir otras configuraciones aquí
        }),
      ],
    });

    // Crear un libro de trabajo inicial (opcionalmente)
    univerAPI.createWorkbook({});
    univerAPI.toggleDarkMode(true);

    set({
      univer,
      univerAPI,
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
      isInitialized: false,
    });
  },
}));

// Exporta una acción para usar el API fácilmente en otros componentes
export const useUniverAPI = () => useUniverStore((state) => state.univerAPI);
export const useUniver = () => useUniverStore((state) => state.univer);
