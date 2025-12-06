import { create } from "zustand";
import { IRuleConfig } from "../types/univerConfig";
// no usar mientras se encuentra una forma efectiva de hacerlo dinamico o tener
// todas las reglas que se vayan a aplicar
// import { parseRulesConfig } from "../helpers/parseRulesConfig";

//  R1
const Range1 = {
  startRow: 0,
  startColumn: 0,
  endRow: 10,
  endColumn: 1,
};

// R2
const Range2 = {
  startRow: 0,
  startColumn: 2,
  endRow: 10,
  endColumn: 3,
};

const Range3 = {
  startRow: 0,
  startColumn: 4,
  endRow: 10,
  endColumn: 5,
};

const mockRuleConfig: IRuleConfig = {
  // aqui se creara un objeto para determinar cuales seran las columnas y rangos que tendran las validaciones
  // desde aqui se moldeara el comportamiento en general de las reglas
  // este objeto debe contener la configuracion de cada regla por separado asi como las columnas que afectan a una u otra regla en conjunto
  numberBetween: {
    isActive: false,
    range: Range1,
    min: 1,
    max: 10,
  },
  textLength: {
    isActive: true,
    range: Range2,
    min: 5,
    max: 15,
  },
  checkBox: {
    isActive: true,
    range: Range3,
    checkValues: {
      checked: "SI",
      unchecked: "NO",
    },
  },
};

type IColumnConfig = number[];

interface IUniverConfigStore {
  // states
  ruleConfig?: IRuleConfig;
  columnConfig?: IColumnConfig;
  // methods
  getRuleConfig: () => IRuleConfig | undefined;
  setColumnConfig: (columnConfig: IColumnConfig) => void;
}

export const useUniverConfigStore = create<IUniverConfigStore>((set, get) => ({
  // estas configuraciones se hacen a la hoja completa, desde aqui se tendrian
  // que inicializar directamente los valores iniciales obtenidos de la base de datos
  // o del localStorage

  ruleConfig: mockRuleConfig,
  columnConfig: undefined,

  getRuleConfig: () => get().ruleConfig,
  setColumnConfig: (columnConfig: IColumnConfig) => set({ columnConfig }),
}));
