import { googleGiftcard, googleLoyalty, appleCard } from "../services";

const appleObj = {};

appleObj.test = async (req, res) => {
  try {
    const status = await appleCard.generatePass();
    return res.jsonp({ status });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create giftcard class
 * @param {*} req
 * @param {*} res
 */
appleObj.createGiftcardClass = async (req, res) => {
  try {
    const data = await googleGiftcard.createClass(req.body);
    return res.jsonp({ ...data });
  } catch (error) {
    return res.status(404).jsonp({ message: error.message });
  }
};

/**
 * Update Giftcard Class
 * @param {*} req
 * @param {*} res
 */
appleObj.updateGiftcardClass = async (req, res) => {
  try {
    const data = await googleGiftcard.updateClass(req.body, req.params);
    return res.jsonp({ ...data });
  } catch (error) {
    return res.status(404).jsonp({ message: error.message });
  }
};

/**
 * Create giftcard obj
 * @param {*} req
 * @param {*} res
 */
appleObj.createGiftcardObj = async (req, res) => {
  try {
    const data = await googleGiftcard.createObject(req.body);
    return res.jsonp({ ...data });
  } catch (error) {
    return res.status(404).jsonp({ message: error.message });
  }
};

/**
 * Google pass object update
 * @param {*} req
 * @param {*} res
 */
appleObj.updateGiftcardObj = async (req, res) => {
  try {
    const data = await googleGiftcard.updateObject(req.body, req.params);
    return res.jsonp({ ...data });
  } catch (error) {
    return res.status(404).jsonp({ message: error.message });
  }
};

/**
 * Get giftcard add to wallet link
 * @param {*} req
 * @param {*} res
 * @returns
 */
appleObj.giftcardAddToWalletRedirection = async (req, res) => {
  const link = await googleGiftcard.addToWalletLink(req.query);
  return res.jsonp({ link });
};

/**
 * Create giftcard class
 * @param {*} req
 * @param {*} res
 */
appleObj.createLoyaltyClass = async (req, res) => {
  try {
    const data = await googleLoyalty.createClass(req.body);
    return res.jsonp({ ...data });
  } catch (error) {
    return res.status(404).jsonp({ message: error.message });
  }
};

/**
 * Update Giftcard Class
 * @param {*} req
 * @param {*} res
 */
appleObj.updateLoyaltyClass = async (req, res) => {
  try {
    const data = await googleLoyalty.updateClass(req.body, req.params);
    return res.jsonp({ ...data });
  } catch (error) {
    return res.status(404).jsonp({ message: error.message });
  }
};

/**
 * Create giftcard obj
 * @param {*} req
 * @param {*} res
 */
appleObj.createLoyaltyObj = async (req, res) => {
  try {
    const data = await googleLoyalty.createObject(req.body);
    return res.jsonp({ ...data });
  } catch (error) {
    return res.status(404).jsonp({ message: error.message });
  }
};

/**
 * Google pass object update
 * @param {*} req
 * @param {*} res
 */
appleObj.updateLoyaltyObj = async (req, res) => {
  try {
    const data = await googleLoyalty.updateObject(req.body, req.params);
    return res.jsonp({ ...data });
  } catch (error) {
    return res.status(404).jsonp({ message: error.message });
  }
};

/**
 * Get giftcard add to wallet link
 * @param {*} req
 * @param {*} res
 * @returns
 */
appleObj.loyaltyAddToWalletRedirection = async (req, res) => {
  const link = await googleLoyalty.addToWalletLink(req.query);
  return res.jsonp({ link });
};

export default appleObj;
