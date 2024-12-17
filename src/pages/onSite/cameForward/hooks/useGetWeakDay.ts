import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import moment from "jalali-moment";
import React, { useEffect, useState } from "react";
import { getWeakDay } from "services/onSite";

export const weakDays = {
  monday: "دوشنبه",
  tuesday: "سه شنبه",
  wednesday: "چهارشنبه",
  thursday: "پنج شنبه",
  friday: "جمعه",
  saturday: "شنبه",
  sunday: "یکشنبه",
};
export interface IOption {
  value: number;
  label: string;
}

export const months = {
  "01": "فروردین",
  "02": "اردیبهشت",
  "03": "خرداد",
  "04": "تیر",
  "05": "مرداد",
  "06": "شهریور",
  "07": "مهر",
  "08": "آبان",
  "09": "آذر",
  "10": "دی",
  "11": "بهمن",
  "12": "اسفند",
};
export default function useGetWeakDay() {
  const [days, setDays] = useState<IOption[]>([]);
  const { data } = useQuery({
    queryKey: ["get-weakDay"],
    queryFn: getWeakDay,
  });

  useEffect(() => {
    if (data) {
      const newData: IOption[] = [];
      data.map((item) => {
        newData.push({
          value: item.id,
          //@ts-ignore
          label: `${weakDays[item.name]} ${moment(item.date, "YYYY-MM-DD")
            .locale("fa")
            .format("D")} ${
            //@ts-ignore
            months[moment(item.date, "YYYY-MM-DD").locale("fa").format("MM")]
          }`,
        });
      });
      setDays(newData);
    }
  }, [data]);
  return { days };
}
