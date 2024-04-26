const ISSUER_ID = "3388000000022290612";
// const GIFTCARD_OBJ_ID = `DEMO_OBJ_${+new Date()}`;

const { GoogleAuth } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";
const batchUrl = "https://walletobjects.googleapis.com/batch";
const classUrl = `${baseUrl}/giftCardClass`;
const objectUrl = `${baseUrl}/giftCardObject`;

const giftcard = {};
const keyFilePath =
  process.env.CREDENTIAL_LINK || "../google-wallet-configuration.json";

const credentials = require(keyFilePath);

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

/**
 * Get giftcard class
 * @param {*} issuerId
 * @param {*} objectSuffix
 * @returns
 */
giftcard.getClass = async (classSuffix) => {
  return await httpClient.request({
    url: `${classUrl}/${classSuffix}`,
    method: "GET",
  });
};

/**
 * Get giftcard object
 * @param {*} issuerId
 * @param {*} objectSuffix
 * @returns
 */
giftcard.getObject = async (objectSuffix) => {
  return await httpClient.request({
    url: `${objectUrl}/${objectSuffix}`,
    method: "GET",
  });
};

/**
 * Giftcard create class
 * @param {*} issuerId
 * @param {*} classSuffix
 * @param {*} body
 * @returns
 */
giftcard.createClass = async (body) => {
  const GIFTCARD_CLASS_ID = `DEMO_CLASS_${+new Date()}`;
  // Check if the class exists
  try {
    await giftcard.getClass(`${ISSUER_ID}.${GIFTCARD_CLASS_ID}`);
    return {
      message: `Class ${ISSUER_ID}.${GIFTCARD_CLASS_ID} already exists!`,
      data: `${ISSUER_ID}.${GIFTCARD_CLASS_ID}`,
    };
  } catch (err) {
    if (err.response && err.response.status !== 404) {
      throw new Error(err);
    }
  }

  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const dataToSave = {
    id: `${ISSUER_ID}.${GIFTCARD_CLASS_ID}`,
    // issuerName: "Issuer name",
    reviewStatus: "UNDER_REVIEW",
    ...body,
  };

  const data = await httpClient.request({
    url: classUrl,
    method: "POST",
    data: dataToSave,
  });

  return { id: `${ISSUER_ID}.${GIFTCARD_CLASS_ID}`, data };
};

/**
 * Giftcard create class
 * @param {*} issuerId
 * @param {*} classSuffix
 * @param {*} body
 * @returns
 */
giftcard.updateClass = async (body, params) => {
  const response = await giftcard.getClass(params.classId);
  if (!response.data) throw new Error("Card object not found");

  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const dataToUpdate = { ...response.data, ...body };
  const data = await httpClient.request({
    url: `${classUrl}/${params.classId}`,
    method: "PUT",
    data: dataToUpdate,
  });

  return { id: `${params.classId}`, data };
};

/**
 * Giftcard create class
 * @param {*} issuerId
 * @param {*} classSuffix
 * @param {*} body
 * @returns
 */
giftcard.createObject = async (body) => {
  const GIFTCARD_OBJ_ID = `DEMO_OBJ_${+new Date()}`;
  // Check if the class exists
  try {
    await giftcard.getObject(`${ISSUER_ID}.${GIFTCARD_OBJ_ID}`);
    return {
      message: `Class ${ISSUER_ID}.${GIFTCARD_OBJ_ID} already exists!`,
      data: `${ISSUER_ID}.${GIFTCARD_OBJ_ID}`,
    };
  } catch (err) {
    if (err.response && err.response.status !== 404) {
      throw new Error(err);
    }
  }

  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const dataToSave = {
    id: `${ISSUER_ID}.${GIFTCARD_OBJ_ID}`,
    state: "ACTIVE",
    ...body,
  };

  const data = await httpClient.request({
    url: objectUrl,
    method: "POST",
    data: dataToSave,
  });

  return { id: `${ISSUER_ID}.${GIFTCARD_OBJ_ID}`, data };
};

/**
 * Giftcard create class
 * @param {*} issuerId
 * @param {*} classSuffix
 * @param {*} body
 * @returns
 */
giftcard.updateObject = async (body, params) => {
  console.log(params);
  const response = await giftcard.getObject(params.objectId);
  if (!response.data) throw new Error("Card object not found");

  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const dataToUpdate = { ...response.data, ...body };
  const data = await httpClient.request({
    url: `${objectUrl}/${params.objectId}`,
    method: "PUT",
    data: dataToUpdate,
  });

  return { id: `${params.objectId}`, data };
};

/**
 * Add to wallet link redirection
 * @param {*} query
 */
giftcard.addToWalletLink = async (query) => {
  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const giftCardClasses = (await giftcard.getClass(query.classId)).data;

  if (!giftCardClasses) {
    throw new Error("Class not found!");
  }
  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardobject
  const giftCardObjects = (await giftcard.getObject(query.objectId)).data;
  if (!giftCardObjects) throw new Error("Class not found!");

  const claims = {
    iss: credentials.client_email,
    aud: "google",
    origins: ["www.example.com"],
    typ: "savetowallet",
    payload: {
      giftCardClasses: [giftCardClasses],
      giftCardObjects: [giftCardObjects],
    },
  };

  // The service account credentials are used to sign the JWT
  let token = jwt.sign(claims, credentials.private_key, {
    algorithm: "RS256",
  });

  return `https://pay.google.com/gp/v/save/${token}`;
};
export default giftcard;
