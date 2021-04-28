import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `internal server error: ${err.message}`,
  });
});

app.listen(3333, () => console.log("server is running"));
