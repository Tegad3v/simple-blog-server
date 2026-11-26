import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import articleRouter from "./routes/articleRoutes.js";
import globalErrorHandler from "./controllers/errorController.js";
import ApiError from "./utils/apiError.js";
import CATEGORIES from "./constants/categories.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/articles", articleRouter);

app.get("/api/categories", (req, res) => {
  res.status(200).json({
    status: "success",
    length: CATEGORIES.length,
    data: CATEGORIES,
  });
});

app.all("/{*splat}", (req, res, next) => {
  next(new ApiError(`Cant find ${req.originalUrl} on our server`, 404));
});

app.use(globalErrorHandler);

export default app;
