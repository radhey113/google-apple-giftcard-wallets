const ISSUER_ID = "3388000000022290612";

const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

const loyalty = {};
const keyFilePath =
  process.env.CREDENTIAL_LINK || "../google-wallet-configuration.json";

const credentials = require(keyFilePath);

const auth = new GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
});

const httpClient = google.walletobjects({
  version: "v1",
  auth: auth,
});

/**
 * Get giftcard class
 * @param {*} issuerId
 * @param {*} objectSuffix
 * @returns
 */
loyalty.getClass = async (classSuffix) => {
  return await httpClient.loyaltyclass.get({
    resourceId: `${classSuffix}`,
  });
};

/**
 * Get giftcard object
 * @param {*} issuerId
 * @param {*} objectSuffix
 * @returns
 */
loyalty.getObject = async (objectSuffix) => {
  return await httpClient.loyaltyobject.get({
    resourceId: `${objectSuffix}`,
  });
};

/**
 * Giftcard create class
 * @param {*} issuerId
 * @param {*} classSuffix
 * @param {*} body
 * @returns
 */
loyalty.createClass = async (body) => {
  const LOYALTY_CLASS_ID = `DEMO_CLASS_${+new Date()}`;
  // Check if the class exists
  try {
    await loyalty.getClass(`${ISSUER_ID}.${LOYALTY_CLASS_ID}`);
    return {
      message: `Class ${ISSUER_ID}.${LOYALTY_CLASS_ID} already exists!`,
      data: `${ISSUER_ID}.${LOYALTY_CLASS_ID}`,
    };
  } catch (err) {
    if (err.response && err.response.status !== 404) {
      throw new Error(err);
    }
  }

  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const dataToSave = {
    id: `${ISSUER_ID}.${LOYALTY_CLASS_ID}`,
    // issuerName: "Issuer name",
    reviewStatus: "UNDER_REVIEW",
    ...body,
  };

  const data = await httpClient.loyaltyclass.insert({
    requestBody: dataToSave,
  });

  return { id: `${ISSUER_ID}.${LOYALTY_CLASS_ID}`, data };
};

/**
 * Giftcard create class
 * @param {*} issuerId
 * @param {*} classSuffix
 * @param {*} body
 * @returns
 */
loyalty.updateClass = async (body, params) => {
  const response = await loyalty.getClass(params.classId);
  if (!response.data) throw new Error("Card object not found");

  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const dataToUpdate = { ...response.data, ...body };
  const data = await httpClient.loyaltyclass.update({
    resourceId: `${params.classId}`,
    requestBody: dataToUpdate,
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
loyalty.createObject = async (body) => {
  const LOYALTY_OBJ_ID = `DEMO_OBJ_${+new Date()}`;
  // Check if the class exists
  try {
    await giftcard.getObject(`${ISSUER_ID}.${LOYALTY_OBJ_ID}`);
    return {
      message: `Class ${ISSUER_ID}.${LOYALTY_OBJ_ID} already exists!`,
      data: `${ISSUER_ID}.${LOYALTY_OBJ_ID}`,
    };
  } catch (err) {
    if (err.response && err.response.status !== 404) {
      throw new Error(err);
    }
  }

  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const dataToSave = {
    id: `${ISSUER_ID}.${LOYALTY_OBJ_ID}`,
    state: "ACTIVE",
    ...body,
  };

  const data = await httpClient.loyaltyobject.insert({
    requestBody: dataToSave,
  });

  return { id: `${ISSUER_ID}.${LOYALTY_OBJ_ID}`, data };
};

/**
 * Giftcard create class
 * @param {*} issuerId
 * @param {*} classSuffix
 * @param {*} body
 * @returns
 */
loyalty.updateObject = async (body, params) => {
  console.log(params);
  const response = await loyalty.getObject(params.objectId);
  if (!response.data) throw new Error("Card object not found");

  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const dataToUpdate = { ...response.data, ...body };
  const data = await httpClient.loyaltyobject.update({
    resourceId: `${params.objectId}`,
    requestBody: dataToUpdate,
  });

  return { id: `${params.objectId}`, data };
};

/**
 * Add to wallet link redirection
 * @param {*} query
 */
loyalty.addToWalletLink = async (query) => {
  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardclass
  const loyaltyClasses = (await loyalty.getClass(query.classId)).data;

  if (!loyaltyClasses) {
    throw new Error("Class not found!");
  }
  // See link below for more information on required properties
  // https://developers.google.com/wallet/retail/gift-cards/rest/v1/giftcardobject
  const loyaltyObjects = (await loyalty.getObject(query.objectId)).data;
  if (!loyaltyObjects) throw new Error("Class not found!");

  const claims = {
    iss: credentials.client_email,
    aud: "google",
    origins: ["www.example.com"],
    typ: "savetowallet",
    payload: {
      loyaltyClasses: [loyaltyClasses],
      loyaltyObjects: [loyaltyObjects],
    },
  };

  // The service account credentials are used to sign the JWT
  let token = jwt.sign(claims, credentials.private_key, {
    algorithm: "RS256",
  });

  return `https://pay.google.com/gp/v/save/${token}`;
};
export default loyalty;
