import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IProductVariant } from "services/onSite/interface";
import useGetData from "./hooks/useGetData";
import ProductImage from "assets/images/test/mobl.png";
import ArrowUp from "assets/images/icons/arrow-up.svg";
import Header from "components/headers/main";
import CustomDrawer from "components/drawer";
import { Card, ConfigProvider, Select } from "antd";
import useGetWeakDay from "./hooks/useGetWeakDay";
import classNames from "classnames";
import useGetTimeRanges from "./hooks/useGetTimeRanges";
import moment from "jalali-moment";
import AcceptIcon from "assets/images/icons/accept.svg";
import {
  DatePicker as DatePickerJalali,
  Calendar,
  JalaliLocaleListener,
} from "antd-jalali";

import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import useGetReservationTimes from "./hooks/useGetReservationTimes";
import useGetAddresses from "./hooks/useGetAddresses";

export default function CameForward() {
  const [selectedDay, setSelectedDay] = useState<number | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { state } = useLocation();
  const [cards, setCards] = useState<IProductVariant | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCustomDay, setIsCustomDay] = useState<boolean>(false);
  const [customDay, setCustomDay] = useState<string | undefined>();
  const [customDay2, setCustomDay2] = useState<string | undefined>();

  const { mutate } = useGetData(setCards);

  const { days } = useGetWeakDay();

  const { timeRanges } = useGetTimeRanges(selectedDay);

  const {reservationTimes} = useGetReservationTimes(customDay2)

  const {addresses} = useGetAddresses()

  useEffect(() => {
    if (state && state.body) {
      mutate(state.body);
    }
  }, [state]);

  const convertToAntDate = (date: any) => {
    let dt_ = moment(new Date(date)).format("YYYY-MM-DD");
    setCustomDay2(dt_)
    setCustomDay(date);
  };

  console.log("dcasdcadc",addresses);

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex-none w-full">
        <Header title="پیش رسید" />
      </div>
      <div className=" grow mx-2">
        <p className=" my-4">خدمات انتخاب شده</p>
        {cards &&
          cards.items.map((item) => (
            <div className=" rounded-xl border-2 border-gray2 p-2 ">
              <div className=" flex justify-between w-full items-center ">
                <div className=" flex gap-2 items-center">
                  <img src={ProductImage} alt="product" className=" w-16" />
                  <p>{item.base_name}</p>
                </div>
                <div className=" flex gap-2 items-center">
                  {/* <img src={TrashIcon} className=" bg-gray2 p-1 rounded-md" /> */}
                  <img src={ArrowUp} className=" bg-gray2 p-1 rounded-md" />
                </div>
              </div>
              {item.variants
                .filter((f) => f.is_selected)
                .map((i) => (
                  <div className=" flex justify-between w-full my-4 text-center items-center">
                    <p className=" bg-gray rounded-md py-1 px-1 text-center w-full mx-1">
                      نوع: {i.variant_name}
                    </p>
                    <p className=" bg-gray rounded-md py-1 px-1 text-center w-full mx-1 ">
                      تعداد: {i.quantity}
                    </p>
                  </div>
                ))}
              {item.new_variants &&
                item.new_variants.map((i) => (
                  <div className=" flex justify-between w-full my-4 text-center items-center">
                    <p className=" bg-gray rounded-md py-1 px-1 text-center w-full mx-1">
                      نوع: {i.variant_quantity} متری
                    </p>
                    <p className=" bg-gray rounded-md py-1 px-1 text-center w-full mx-1">
                      تعداد: {i.quantity}
                    </p>
                  </div>
                ))}
              <p>قیمت تقزیبی: {item.base_total_price.toString()}</p>
            </div>
          ))}
      </div>
      <div
        className=" flex-none  bg-white p-3 shadow-[-1px_-15px_24px_-2px_rgba(0,_0,_0,_0.1)]"
        onClick={() => setIsOpen(true)}
      >
        <div className=" flex justify-between">
          <p>زمان و محل خدمت</p>
          <img src={ArrowUp} className=" p-2 rounded-md bg-gray2" />
        </div>
        <div className=" flex justify-between">
          <p>مبلغ کل:</p>
          <p>{cards?.total_price.toString()} تومان</p>
        </div>
      </div>
      <CustomDrawer
        onClose={() => setIsOpen(false)}
        show={isOpen}
        placement="bottom"
        title="زمان و محل خدمت"
        height="430px"
      >
        <>
          <Card>
            <>
              <div className=" flex justify-between">
                <p>کجا و کی دریافت کنیم؟</p>
                <p className=" text-[#FF671D]"> + افزودن آدرس</p>
              </div>
             {!isCustomDay ?  <p className="my-2">تاریخ و زمان</p> : ""}
              {!isCustomDay ? (
                <>
                  <Select
                    className=" w-full my-2"
                    size="large"
                    options={days}
                    onChange={(value) => setSelectedDay(value)}
                  />
                  <div className=" flex my-2">
                    {timeRanges &&
                      timeRanges.time_ranges.map((time) => (
                        <div
                          className={classNames(
                            " py-2 px-2 rounded-full text-center mx-1",
                            time.uuid === selectedTime &&
                              " border border-primary",
                            time.is_available ? "bg-gray2 " : " bg-gray"
                          )}
                          onClick={() => {
                            if (time.is_available) {
                              setSelectedTime(time.uuid);
                            }
                          }}
                        >
                          {moment(
                            time.time_range_value.time_from,
                            "HH:mm:ss"
                          ).format("HH")}{" "}
                          -{" "}
                          {moment(
                            time.time_range_value.time_to,
                            "HH:mm:ss"
                          ).format("HH")}
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          </Card>

          {!isCustomDay ? (
            <></>
          ) : (
            <div className=" w-full">
              <ConfigProvider locale={fa_IR} direction="rtl">
                <JalaliLocaleListener />
                <p>انتخاب تاریخ</p>
                <div className=" w-full">
                  <DatePickerJalali
                    style={{ width: "100%" }}
                    size="large"
                    onChange={(value: any) => convertToAntDate(value)}
                    value={customDay}
                  />
                </div>
                {reservationTimes &&
                      reservationTimes.time_ranges.map((time) => (
                        <div
                          className={classNames(
                            " py-2 px-2 rounded-full text-center mx-1",
                            time.uuid === selectedTime &&
                              " border border-primary",
                            time.is_available ? "bg-gray2 " : " bg-gray"
                          )}
                          onClick={() => {
                            if (time.is_available) {
                              setSelectedTime(time.uuid);
                            }
                          }}
                        >
                          {moment(
                            time.time_range_value.time_from,
                            "HH:mm:ss"
                          ).format("HH")}{" "}
                          -{" "}
                          {moment(
                            time.time_range_value.time_to,
                            "HH:mm:ss"
                          ).format("HH")}
                        </div>
                      ))}
              </ConfigProvider>
            </div>
          )}
          <div className=" flex justify-between my-2">
            <p>مبلغ کل:</p>
            <p>{cards?.total_price.toString()} تومان</p>
          </div>
          <div className=" flex justify-between">
            <p>بیعانه برای ثبت سفارش:</p>
            <p>{cards?.total_price.toString()} تومان</p>
          </div>

          {!isCustomDay ? (
            <>
              <button className=" bg-primary text-white w-full py-2 rounded-md flex items-center justify-center my-3 ">
                تایید و پرداخت{" "}
                <span>
                  <img
                    src={AcceptIcon}
                    className=" bg-white rounded-full mx-1"
                  />
                </span>
              </button>
              <button
                className=" text-primary  w-full py-2 rounded-md flex items-center justify-center my-3 "
                onClick={() => setIsCustomDay(true)}
              >
                رزرو تاریخ دلخواه
              </button>
            </>
          ) : (
            <>
              <button className=" bg-primary text-white w-full py-2 rounded-md flex items-center justify-center my-3 ">
                پرداخت بیعانه و رزرو
                <span>
                  <img
                    src={AcceptIcon}
                    className=" bg-white rounded-full mx-1"
                  />
                </span>
              </button>
              <button
                className=" text-primary  w-full py-2 rounded-md flex items-center justify-center my-3 "
                onClick={() => setIsCustomDay(false)}
              >
                بازگشت
              </button>
            </>
          )}
        </>
      </CustomDrawer>
    </div>
  );
}
