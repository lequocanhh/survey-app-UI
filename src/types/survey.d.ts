export type OptionProp = {
    title: string;
    selected: boolean;
  };

export type Question = {
    title: string;
    options: Option[];
    required: boolean;
    open: boolean;
  };