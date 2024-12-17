import request from "services/axios";
import {
  IBaseProduct,
  ICardItemPayload,
  IProductVariant,
  ITimeRanges,
  IWeakDays,
} from "./interface";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getBaseProduct = async () => {
  const { data }: { data: IBaseProduct[] } = await request.get(
    "inventory/base-product/?base_category_id=1"
  );
  return data;
};

export const getProductVariants = async (ctx: QueryFunctionContext) => {
  //@ts-ignore
  const baseProducts: string = ctx.queryKey[1].toString();
  const { data }: { data: IProductVariant } = await request.get(
    `inventory/carts/?base_product_uuids=${baseProducts}`
  );
  return data;
};

export const setCardService = async (payload: IProductVariant) => {
  const { data }: { data: IProductVariant } = await request.post(
    "inventory/carts/",
    {
      cart_items: payload,
    }
  );
  return data;
};
export const getWeakDay = async () => {
  const { data }: { data: IWeakDays[] } = await request.get(
    "ambassador/week-days"
  );
  return data;
};

export const timeRanges = async (ctx: QueryFunctionContext) => {
  const { data }: { data: ITimeRanges } = await request.get(
    `ambassador/day-time-range/${ctx.queryKey[1]}`
  );
  return data;
};
