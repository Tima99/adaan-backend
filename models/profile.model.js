import mongoose from "mongoose";

const basicDetailSchema = new mongoose.Schema({
  image: String,
  name: String,
});

const contactDetailSchema = new mongoose.Schema({
  email: String,
  phone: String,
  socialUrls: [String],
});

const experienceSchema = new mongoose.Schema({
  companyName: String,
  position: String,
  startDate: Date,
  endDate: Date,
  isCurrentlyWorking: Boolean,
  summary: String,
});

const qualficationSchema = new mongoose.Schema({
  degree: String,
  college: String,
  startDate: Date,
  endDate: Date,
  isCurrentlyStudying: Boolean,
});

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: 1
    },
    basicDetail: basicDetailSchema,
    contactDetail: contactDetailSchema,
    experiences: [experienceSchema],
    qualfications: [qualficationSchema],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
