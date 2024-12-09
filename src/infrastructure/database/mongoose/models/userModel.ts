import { Schema, model, Document } from "mongoose";
import { IPublicUserData } from "../../../../application/interfaces";

export interface IUserData extends Document {
  username: string;
  email: string;
  phone: number | null;
  profileImg: string | null;
  password: string;
  isBlocked: boolean;
  otp?: {
    value: string;
    expirationTime: Date;
  };
  isVerified: boolean;
  toPublicData(): IPublicUserData;
}


const userSchema = new Schema<IUserData>(

  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, default: null },
    profileImg: { type: String, default: null },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    otp: {
      value: { type: String },
      expirationTime: { type: Date }
    },
    isVerified: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }

);


userSchema.methods.toPublicData = function(): IPublicUserData {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    profileImg: this.profileImg,
    isVerified: this.isVerified
  };
};

export default model<IUserData>("User", userSchema);