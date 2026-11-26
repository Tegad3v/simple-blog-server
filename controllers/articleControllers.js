import Article from "../models/articleModel.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/apiError.js";
import User from "../models/userModel.js";

export const getLatestArticles = catchAsync(async (req, res) => {
  const total = User.count();

  console.log(latest);
});

export const getAllArticles = catchAsync(async (req, res) => {
  const category = req.query.category;

  const filter = {};

  if (category) filter.category = category.toLowerCase();

  const articles = await Article.find(filter).populate({
    path: "author",
    select: "name avatar",
  });

  res.status(200).json({
    status: "success",
    length: articles.length,
    data: articles,
  });
});

export const getArticleBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;

  const article = await Article.findOne({ slug }).populate({
    path: "author",
    select: "name",
  });

  if (!article) {
    next(new ApiError("Article not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: article,
  });
});

export const createArticle = catchAsync(async (req, res, next) => {
  const article = await Article.create(req.body);

  req.user.articles.push(article._id);

  await req.user.save();

  res.status(201).json({
    status: "success",
    data: article,
  });
});

export const updateArticleBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;

  const article = await Article.findOneAndUpdate({ slug }).populate({
    path: "author",
    select: "name",
  });

  if (!article) {
    next(new ApiError("Article not found", 404));
  }

  const isOwner = article.author.toString() === req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return next(
      new ApiError("You do not have permission to edit this article", 403),
    );
  }

  Object.assign(article, req.body);

  await article.save();

  res.status(200).json({
    status: "success",
    data: article,
  });
});

export const deleteArticleBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;

  const deletedArticle = await Article.findOne({ slug });

  if (!deletedArticle) {
    next(new ApiError("Article not found", 404));
  }

  await Article.findOneAndDelete({ slug });

  res.status(204).json({
    status: "success",
    message: "Article Deleted Successfully",
  });
});
