import { IUserData } from "../../../domain/entities";
import { IUserRepository } from "../../../domain/repositories";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<IUserData | null> {
    return this.userRepository.findById(userId);
  }
}