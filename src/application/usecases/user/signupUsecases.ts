
import { IUserRepository } from '../../../domain/repositories';
import { User } from '../../../domain/entities';
import { hashPassword } from '../../../infrastructure';
import { userSignupResponse } from '../../dtos/auth/userSignupResponse';
import { Types } from 'mongoose';


export class SignupUseCase {

  constructor(
    private userRepository: IUserRepository,

  ) { }

  async execute(
    username: string,
    email: string,
    password: string
  ): Promise<userSignupResponse> {



    if (!username || !email || !password) {
      throw new Error("Invalid input");
    }

    const existingEmail = await this.userRepository.findByEmail(email);


    if (existingEmail && existingEmail.isVerified) {
      return {  isVerified: true,  message: "User email is already registered and verified.", savedUser: existingEmail  };
    }
    
        const hashedPassword = await hashPassword(password);

        const user = new User({
          _id: new Types.ObjectId(),
          username,
          email,
          profileImg: null,
          password: hashedPassword,
          isBlocked: false,
          otp: undefined,
          isVerified: false
        });


        const savedUser = await this.userRepository.save(user);
      
        return {
          savedUser,
        };

    }

  }