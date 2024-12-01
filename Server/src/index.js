import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "../logs/logger.js";
import apiRouter from "./routes/apiRoutes.js";
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/dbConfig.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
const morganFormat = ":method :url :status :response-time ms";

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
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
app.use(errorMiddleware);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port: ${PORT}`);
  } catch (error) {
    console.log(`Error in connecting with the server: ${error}`);
  }
});
