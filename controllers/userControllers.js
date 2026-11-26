import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../utils/apiError.js";

export const getSavedPosts = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).populate({
    path: "savedPosts",
    select: "title slug excerpt image category author date readTime",
    populate: { path: "author", select: "name" },
  });

  if (!user) return next(new ApiError("User not found", 404));

  const saved = user.savedPosts.filter(Boolean);

  res.json({ saved });
});
