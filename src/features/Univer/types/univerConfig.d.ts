export interface IRuleConfig {
  numberBetween: {
    isActive: boolean;
    range: IRange;
    min: number;
    max: number;
  };
  textLength: {
    isActive: boolean;
    range: IRange;
    min: number;
    max: number;
  };
}
