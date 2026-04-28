import { Model, UpdateQuery } from 'mongoose';
import { UserDocument } from './user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(userData: any): Promise<UserDocument>;
    findOneByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    updateOnboarding(email: string, onboardingData: UpdateQuery<UserDocument>): Promise<UserDocument | null>;
    updateAvatar(email: string, profilePhoto: string): Promise<UserDocument | null>;
    updatePhone(email: string, phone: string): Promise<UserDocument | null>;
}
