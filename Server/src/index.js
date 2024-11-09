import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "../logs/logger.js";
import apiRouter from "./routes/apiRoutes.js";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";

const app = express();
const morganFormat = ":method :url :status :response-time ms";

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use("/api", apiRouter);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port: ${PORT}`);
  } catch (error) {
    console.log(`Error in connecting with the server: ${error}`);
  }
});
