import { userModel, IUserData } from '../../../infrastructure/database';
import { IUserRepository } from '../interface/userinterface';
import { User } from '../../entities';
import { IPublicUserData } from '../../../application/interfaces';


export class UserRepository implements IUserRepository {


  async findPublicDataById(userId: string): Promise<IPublicUserData | null> {
    try {
      const user = await userModel.findById(userId)
        .select({
          username: 1,
          profileImg: 1,
          isVerified: 1,
          email: 1,
          _id: 1
        })
        .lean();
      if (user) {
        return {
          ...user,
          _id: user._id.toString(),
        };
      }

      return null;
    } catch (error) {
      throw new Error("Error in db");
    }
  }

   async updateProfileImage(userId: string, imageUrl: string): Promise<IPublicUserData | null> {  
    const updatedUser = await userModel.findByIdAndUpdate(  
      userId,   
      { profileImg: imageUrl },   
      { new: true }  
    );  

    return updatedUser ? updatedUser.toPublicData() : null;  
  }

  async getAll(): Promise<IUserData[] | null> {
    try {
      return await userModel.find();
    } catch (error) {
      throw new Error("error in db");
    }
  }


  async findByEmail(email: string): Promise<IUserData | null> {

    try {

      const user = await userModel.findOne({ email });

      if (!user) return null;

      return user;

    } catch (error) {
      console.log(error, "error");
      return null;
    }
  }

  async findById(userId: string): Promise<IUserData | null> {
    try {

      const user = await userModel.findById(userId).exec();
      return user;

    } catch (error) {
      console.error("Error finding user by ID:", error);
      return null;
    }
  }



  async save(user: User): Promise<User> {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("error in db");
    }
  }


  async getCurrentUser(email: string): Promise<User | null> {
    try {

      const user = await userModel.findOne({ email }).exec();
      if (!user) return null;

      return user;

    } catch (error) {
      console.error('Error retrieving current user:', error);
      return null;
    }
  }

  async updateUserOtpVerified(userId: string): Promise<void> {
    try {
      await userModel.updateOne(
        { _id: userId },
        { $set: { 'isVerified': true } }
      ).exec();
    } catch (error) {
      throw new Error('Error updating OTP verification status in the database');
    }
  }


  async create(googleUser: Partial<IUserData>): Promise<IUserData> {
    try {
      if (!googleUser.email || !googleUser.password) {
        throw new Error("Missing required fields: email or password");
      }

      const user = new userModel({
        username: googleUser.username ?? 'Unknown',
        email: googleUser.email,
        phone: googleUser.phone ?? null,
        profileImg: googleUser.profileImg ?? null,
        password: googleUser.password,
        isBlocked: googleUser.isBlocked ?? false,
        otp: googleUser.otp ?? undefined
      });

      return await user.save();
    } catch (error) {
      throw new Error(`Error creating new user: ${error}`);
    }
  }



}