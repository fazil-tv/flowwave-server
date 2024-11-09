import {User} from '../../entities';
import { IUserData } from "../../../infrastructure/database";


export interface IUserRepository {
    getAll(): Promise<IUserData[] | null>;
    findByEmail(email:string):Promise<IUserData |null>;
    findById(userId: string): Promise<IUserData | null>;
    save(user: User): Promise<User>
}
