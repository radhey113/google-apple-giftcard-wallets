"use strict";
import google from "../../controller/google";

export default (app) => {
  app.post("/google/loyalty/class", google.createLoyaltyClass);
  app.put("/google/loyalty/class/:classId", google.updateLoyaltyClass);

  app.get(
    "/google/loyalty/add-to-wallet-redirection",
    google.loyaltyAddToWalletRedirection
  );

  app.post("/google/loyalty/object", google.createLoyaltyObj);
  app.put("/google/loyalty/object/:objectId", google.updateLoyaltyObj);
  return;
};
