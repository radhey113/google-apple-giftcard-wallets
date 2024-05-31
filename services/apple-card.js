import { PKPass } from "passkit-generator";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const applePass = {};

applePass.generatePass = () => {
  PKPass.from(
    {
      // model: path.resolve("./custom.pass"),
      // model: "./passtemplate/Coupon.pass",
      model: "./passtemplate/store.pass",
      certificates: {
        signerCert: readFileSync(path.resolve("./certs/signerCert.pem")),
        signerKey: readFileSync(path.resolve("./certs/signerKey.pem")),
        wwdr: readFileSync(path.resolve("./certs/wwdr01.pem")),
        signerKeyPassphrase: `1234`,
      },
    },
    {
      description: "Hi test pass creation",
    }
  )
    .then(async (newPass) => {
      // newPass.primaryFields[0] = {
      //   key: "primary",
      //   label: "Member name",
      //   value: "Radhey Shyam",
      // };
      // newPass.secondaryFields.push(
      //   {
      //     key: "member",
      //     label: "MEMBER",
      //     value: "Radhey Shyam",
      //   },
      //   {
      //     key: "tier",
      //     label: "TIER",
      //     value: "VIP Tier",
      //   },
      //   {
      //     key: "tier",
      //     label: "TIER",
      //     value: "VIP Tier",
      //   }
      // );

      // const buffer1 = readFileSync(
      //   path.resolve("./services/custom.pass/strip@2x.png")
      // );
      // newPass.addBuffer("en.lproj/strip@2x.png", buffer1);
      // newPass.setBarcodes("This is a PDF417 by TEC-IT"); // Random value
      // newPass.setBarcodes([
      //   {
      //     altText: "This is test barcode to check bellow alt message",
      //     messageEncoding: "iso-8859-1",
      //     format: "PKBarcodeFormatQR",
      //     message: "This is a PDF417 by TEC-IT",
      //   },
      // ]);
      newPass.setBarcodes({
        altText: "This is test barcode to check bellow alt message",
        messageEncoding: "iso-8859-1",
        format: "PKBarcodeFormatPDF417",
        message: "This is a PDF417 by TEC-IT",
      }); // Random value
      // Generate the stream .pkpass file stream
      // const buffer = newPass.getAsBuffer();
      const buffer = newPass.getAsBuffer();
      console.log(newPass.model);

      await writeFileSync(`passes/${+new Date()}new.pkpass`, buffer);
      console.log("Pass::: 004 ");
      return newPass;
    })
    .catch((error) => {
      console.log("Error::: ", error);
    });
};

export default applePass;
