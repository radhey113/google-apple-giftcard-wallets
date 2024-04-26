import { googleGiftcard, googleLoyalty } from "../services";

const googleObj = {};

/**
 * Create giftcard class
 * @param {*} req
 * @param {*} res
 */
googleObj.createGiftcardClass = async (req, res) => {
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
googleObj.updateGiftcardClass = async (req, res) => {
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
googleObj.createGiftcardObj = async (req, res) => {
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
googleObj.updateGiftcardObj = async (req, res) => {
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
googleObj.giftcardAddToWalletRedirection = async (req, res) => {
  const link = await googleGiftcard.addToWalletLink(req.query);
  return res.jsonp({ link });
};

/**
 * Create giftcard class
 * @param {*} req
 * @param {*} res
 */
googleObj.createLoyaltyClass = async (req, res) => {
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
googleObj.updateLoyaltyClass = async (req, res) => {
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
googleObj.createLoyaltyObj = async (req, res) => {
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
googleObj.updateLoyaltyObj = async (req, res) => {
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
googleObj.loyaltyAddToWalletRedirection = async (req, res) => {
  const link = await googleLoyalty.addToWalletLink(req.query);
  return res.jsonp({ link });
};

export default googleObj;
