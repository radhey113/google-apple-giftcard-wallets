import express, { json } from "express";
import googleRoutes from "../routes/google";
import appleRoutes from "../routes/apple";

const startServer = () => {
  const app = express();
  app.use(json());

  const PORT = process.env.PORT || 2201;
  googleRoutes(app);
    appleRoutes(app);

  app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
};

export default startServer;
