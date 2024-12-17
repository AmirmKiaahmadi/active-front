export interface IBaseProduct {
  base_uuid: string;
  base_name: string;
  base_image: string;
}

export interface IProductVariant {
  total_price: number;
  total_duration: number;
  items: IProductVariantChild[];
}

export interface IProductVariantChild {
  base_uuid: string;
  base_name: string;
  base_image: string;
  other: boolean;
  base_total_price: number;
  base_total_duration: number;
  variants: IProductVariantChildToChild[];
  new_variants: { variant_quantity: number; quantity: number }[];
}

export interface IProductVariantChildToChild {
  variant_uuid: string;
  variant_name: string;
  variant_quantity: number;
  quantity: number;
  is_selected: boolean;
}

export interface ICardItemPayload {
  base_uuid: string;
  base_name: string;
  base_image: string;
  other: boolean;
  base_total_price: null | number;
  base_total_duration: number;
  variants: IProductVariantChildToChild[];
  new_variants: { variant_quantity: number; quantity: number }[];
}

export interface IWeakDays {
  id: number;
  name: string;
  service_type: string;
  date: string;
  day_available: boolean;
  time_ranges: ITimeRanges[];
}

export interface ITimeRanges {
  uuid: string;
  time_range_value: {
    time_from: string;
    time_to: string;
    is_active: boolean;
  };
  is_available: boolean;
}

export interface ITimeRanges {
  id: number;
  name: string;
  service_type: string;
  date: string;
  time_ranges: ItimeRange[];
}

export interface ItimeRange {
  uuid: string;
  time_range_value: {
    time_from: string;
    time_to: string;
    is_active: boolean;
  };
  is_available: boolean;
}
