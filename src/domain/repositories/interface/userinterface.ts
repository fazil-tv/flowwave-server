import {User} from '../../entities';
import { IUserData } from "../../../infrastructure/database";
import { IPublicUserData } from '../../../application/interfaces';


export interface IUserRepository {
    findPublicDataById(userId: string): Promise<IPublicUserData | null>;
    getAll(): Promise<IUserData[] | null>;
    findByEmail(email:string):Promise<IUserData |null>;
    findById(userId: string): Promise<IUserData | null>;
    updateUserOtpVerified(userId: string): Promise<void>;
    create(googleUser: Partial<IUserData>): Promise<IUserData>;
    save(user: User): Promise<User>
}
