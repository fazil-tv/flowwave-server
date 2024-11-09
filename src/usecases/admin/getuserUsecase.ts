import { User } from "../../entities";
import { AdminRepository } from "../../repositories/implementation/adminRepository";

export default class UserService {
    private adminRepository: AdminRepository;

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    public async getAllUsers(): Promise<User[]> {
        try {
         
            const users = await this.adminRepository.getAll();
            return users || [];
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }
}
