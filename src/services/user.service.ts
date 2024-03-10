import { IUser } from '../models/user';
import { hashPassword } from '../utils/encryptPassword';
import { calculateAge } from '../utils/calculateAge';
import { validatePhoneNumber } from '../utils/verifyPhoneNumber';
import { IUserRepository } from '../interface/userRepository.interface';
import { sendVerifyEmail } from '../utils/sendVerifyEmail';

export class UserService {
  constructor(private readonly User: IUserRepository) {}
  async createUser(payload: IUser): Promise<IUser> {
    await this.User.getByEmail(payload.email);
    const hashedPassword = await hashPassword(payload.password);
    payload.password = hashedPassword;
    const newUser = await this.User.create(payload);
    await sendVerifyEmail(payload._id, payload.accountType, payload.email, payload.firstName);
    return newUser;
  }

  async updateUser(userId: string, payload: IUser): Promise<IUser | null> {
    await this.User.getOne(userId);
    payload.age = calculateAge(payload.DOB);
    payload.phone = validatePhoneNumber(payload.phone);
    payload.alternatePhone = validatePhoneNumber(payload.alternatePhone);
    const updatedUserData = JSON.parse(JSON.stringify(payload));
    const user = await this.User.update(userId, updatedUserData);
    return user;
  }
}
