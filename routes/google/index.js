"use strict";
import giftcardRoute from "./giftcard";
import loyaltyRoute from "./loyalty";

export default (app) => {
  giftcardRoute(app);
  loyaltyRoute(app);
};
