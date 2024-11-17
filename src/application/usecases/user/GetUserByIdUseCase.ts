import { IUserRepository } from "../../../domain/repositories";
import { BaseResponseDto } from "../../dtos/common/BaseResponseDto";
import { IPublicUserData } from "../../interfaces";
export class GetUserByIdUseCase {
    constructor(private userRepository: IUserRepository) {}
  
    async execute(userId: string): Promise<BaseResponseDto<IPublicUserData | null>>  {
      try {
        const user = await this.userRepository.findPublicDataById(userId);
        
        if (!user) {
            return BaseResponseDto.notFound('User not found');
          }
    
        return BaseResponseDto.success(user);
      } catch (error) {
        return BaseResponseDto.error('Failed to fetch user details');
      }
    }
  }     