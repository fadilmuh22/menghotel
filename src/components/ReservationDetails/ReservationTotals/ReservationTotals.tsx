import React from "react";

import { useCart } from "hooks";

import styleClasses from "./ReservationTotals.module.scss";
import { idrFormat } from "lib/scripts/utils";

type TypeReservationTotalsProps = {};

const ReservationTotals: React.FC<TypeReservationTotalsProps> = (
  props: TypeReservationTotalsProps
) => {
  const { cart, coupon, totals } = useCart();

  let discountAmount = 0;
  if (coupon.id) {
    const discountPercentage = coupon.discountAmmount
      ? coupon.discountAmmount
      : 0;
    discountAmount = (discountPercentage / 100) * totals.final;
  }

  return (
    <li className={styleClasses["reservation-details__totals"]}>
      <div className={styleClasses["reservation-details__totals__item"]}>
        <span className={styleClasses["reservation-details__totals__title"]}>
          Room price
        </span>
        <span className={styleClasses["reservation-details__totals__value"]}>
          {idrFormat(totals.room)}
        </span>
      </div>
      <div className={styleClasses["reservation-details__totals__item"]}>
        <span className={styleClasses["reservation-details__totals__title"]}>
          Price impact ratio
        </span>
        <span className={styleClasses["reservation-details__totals__value"]}>
          {totals.ratio}%
        </span>
      </div>
      <div className={styleClasses["reservation-details__totals__item"]}>
        <span className={styleClasses["reservation-details__totals__title"]}>
          Accomodation{" "}
          <span>
            {cart.days} {cart.days && +cart.days > 1 ? "Days" : "Day"}
          </span>
        </span>
        <span className={styleClasses["reservation-details__totals__value"]}>
          {idrFormat(totals.total)}
        </span>
      </div>
      {coupon.code && (
        <div className={styleClasses["reservation-details__totals__item"]}>
          <span className={styleClasses["reservation-details__totals__title"]}>
            Discount <span>({coupon.code})</span>
          </span>
          <span className={styleClasses["reservation-details__totals__value"]}>
            -{idrFormat(discountAmount)}
          </span>
        </div>
      )}
      <div className={styleClasses["reservation-details__totals__total"]}>
        <span className={styleClasses["reservation-details__totals__title"]}>
          Total amount
        </span>
        <span className={styleClasses["reservation-details__totals__value"]}>
          {idrFormat(totals.final - discountAmount)}
        </span>
      </div>
    </li>
  );
};

export default ReservationTotals;
