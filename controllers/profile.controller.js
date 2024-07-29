import { imageUpload } from "../middleware/upload.middleware.js";
import Profile from "../models/profile.model.js";

export const createUpdate = async (req, res, next) => {
    try {
        const { name, removedImage } = req.body;

        const image = req.file?.filename;

        const userId = req.user._id;

        const profile = await Profile.findOneAndUpdate(
            { userId },
            {
                basicDetail: {
                    name,
                    ...(removedImage == -1
                        ? { image: null }
                        : image && { image }),
                },
            },
            {
                upsert: true,
            }
        );

        profile?.basicDetail?.image &&
            (await imageUpload._delete(profile?.basicDetail?.image));

        res.json({
            message: "Profile created/updated",
            profile,
        });
    } catch (error) {
        console.log(error);
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
            },
            {
                new: true,
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

export const readProfileTab = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { tabName } = req.params;
        
        const profile = await Profile.findOne({
            userId,
        }).lean();

        res.json({
            data: profile ? profile[tabName] : null,
        });
    } catch (error) {
        next(error);
    }
};

export const readProfile = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        
        const profile = await Profile.findOne({
            userId,
        }).lean();

        res.json({
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};
