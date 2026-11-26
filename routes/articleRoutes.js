import express from "express";
import * as articleController from "../controllers/articleControllers.js";
import * as authController from "../controllers/authController.js";

const articleRouter = express.Router();

articleRouter.route("./latest").get(articleController.getLatestArticles);

articleRouter
  .route("/")
  .get(articleController.getAllArticles)
  .post(
    authController.protect,
    authController.restrictTo("author", "admin"),
    articleController.createArticle,
  );

articleRouter
  .route("/:slug")
  .get(articleController.getArticleBySlug)
  .patch(authController.protect, articleController.updateArticleBySlug)
  .delete(
    authController.protect,
    authController.restrictTo("author", "admin"),
    articleController.deleteArticleBySlug,
  );

export default articleRouter;
