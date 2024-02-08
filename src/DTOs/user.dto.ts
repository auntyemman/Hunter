// import { IUser } from '../models/user';
import { isValidEmail } from '../utils/emailValidation';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: string; // Add accountType field if needed

  constructor(data: any) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.accountType = data.accountType; // Add accountType assignment if needed
  }

  isValid() {
    // Implement your validation logic here
    if (!this.password || this.password.length < 8) {
      return false;
    }
    if (!isValidEmail(this.email)) {
      return false;
    }
    // Add more validation rules as needed
    return true;
  }
}
