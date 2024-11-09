
import { AdminCredentials } from "../../entities";
import { userModel, IUserData } from '../../../infrastructure/database';

export class AdminRepository {
   getAdminCredentials(): AdminCredentials {
        const email = process.env.ADMIN_EMAIL || ''; 
        const password = process.env.ADMIN_PASSWORD || '';
        return new AdminCredentials(email, password);
    }
    
    async getAll(): Promise<IUserData[] | null> {
        try {
          return await userModel.find();
        } catch (error) {
          throw new Error("error in db");
        }
      }
}
