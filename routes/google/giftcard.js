"use strict";
import google from "../../controller/google";

export default (app) => {
  app.post("/google/giftcard/class", google.createGiftcardClass);
  app.put("/google/giftcard/class/:classId", google.updateGiftcardClass);

  app.get(
    "/google/giftcard/add-to-wallet-redirection",
    google.giftcardAddToWalletRedirection
  );

  app.post("/google/giftcard/object", google.createGiftcardObj);
  app.put("/google/giftcard/object/:objectId", google.updateGiftcardObj);
  return;
};
