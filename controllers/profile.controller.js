import Profile from "../models/profile.model.js";

export const createUpdate = async (req, res, next) => {
  try {
    const { name, removedImage } = req.body;

    const image = req.file?.image;

    const userId = req.user._id;

    const profile = await Profile.updateOne(
      { userId },
      {
        basicDetail: {
          name,
          ...(removedImage == -1 ? { image: null } : image && { image }),
        },
      },
      {
        upsert: true,
      }
    );

    res.json({
      message: "Profile created/updated",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfileTab = async (req, res, next) => {
  try {
    const { tabName } = req.params;
    if (!tabName) throw new Error("Tab is required");

    const data = req.body;

    const userId = req.user._id;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        $set: {
          [tabName]: data,
        },
      }
    );

    res.json({
      message: "Profile updated",
      profile,
    });
  } catch (error) {
    next(error);
  }
};
