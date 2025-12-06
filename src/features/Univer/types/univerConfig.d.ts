export interface IRuleConfig {
  numberBetween?: {
    isActive: boolean;
    range: IRange;
    min: number;
    max: number;
  };
  textLength?: {
    isActive: boolean;
    range: IRange;
    min: number;
    max: number;
  };
  checkBox?: {
    isActive: boolean;
    range: IRange;
    checkValues: {
      checked: boolean | string | number;
      unchecked: boolean | string | number;
    };
  };
  dropdown?: {
    isActive: boolean;
    range: IRange;
    listValues: string[];
  };
}
