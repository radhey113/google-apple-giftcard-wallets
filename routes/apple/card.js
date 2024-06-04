"use strict";
import apple from "../../controller/apple";

export default (app) => {
  app.get("/apple/test", apple.test);
  app.post("/apple/giftcard/class", apple.createGiftcardClass);
  app.put("/apple/giftcard/class/:classId", apple.updateGiftcardClass);

  app.get(
    "/apple/giftcard/add-to-wallet-redirection",
    apple.giftcardAddToWalletRedirection
  );

  app.post("/apple/giftcard/object", apple.createGiftcardObj);
  app.put("/apple/giftcard/object/:objectId", apple.updateGiftcardObj);
  app.get("/apple/notification/cb", (req, res) => {
    console.log("reached");
    return res.jsonp({ status: true });
  });
  return;
};
