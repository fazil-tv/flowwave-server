import { IUserRepository } from "../../../domain/repositories";
import { uploadToCloudinary } from '../../../infrastructure/utils/cloudinary';
import { BaseResponseDto } from "../../dtos/common/BaseResponseDto";

export class UserProfileUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(userId: string, file: string | Buffer) {
        try {
            const imageUrl = await uploadToCloudinary(file);
            const updatedUser = await this.userRepository.updateProfileImage(userId, imageUrl);
            
            return updatedUser 
                ? BaseResponseDto.success(updatedUser, 'Profile image updated successfully')
                : BaseResponseDto.error('Failed to update profile image');
        } catch (error) {
            console.error(error);
            return BaseResponseDto.serverError('Error uploading profile image');
        }
    }
}