import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MinLength,
  IsArray,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/*-------------------------------------------SignUpDTO-------------------------------------------*/
enum AccountType {
  Hunter = 'hunter',
  Agent = 'agent',
  Landlord = 'landlord',
}

export class SignUpDTO {
  @IsOptional()
  @IsString()
  _id!: string;

  @IsNotEmpty({ message: 'Please provide an account type' })
  @IsString()
  @IsEnum(AccountType)
  accountType!: AccountType;

  @IsNotEmpty({ message: 'Please provide a first name' })
  @IsString()
  firstName!: string;

  @IsNotEmpty({ message: 'Please provide a last name' })
  @IsString()
  lastName!: string;

  @IsNotEmpty({ message: 'Please provide an email' })
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: 'Please provide a password' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}

/*-------------------------------------------profileDTO-------------------------------------------*/
enum Gender {
  Male = 'male',
  Female = 'female',
}

class AddressDTO {
  @IsString()
  street!: string;

  @IsString()
  city!: string;

  @IsString()
  LGA!: string;

  @IsString()
  state!: string;

  @IsString()
  zipCode!: string;
}

export class ProfileDTO {
  @IsOptional()
  @IsString()
  _id!: string;

  @IsNotEmpty({ message: 'Please provide a first name' })
  @IsString()
  firstName!: string;

  @IsNotEmpty({ message: 'Please provide a last name' })
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsString()
  middleName!: string;

  @IsString()
  phone!: string;

  @IsString()
  alternatePhone!: string;

  @IsOptional()
  @IsOptional()
  DOB!: string;

  @IsNotEmpty({ message: 'Please provide a gender' })
  @IsString()
  @IsEnum(Gender)
  gender!: Gender;

  @IsString()
  @IsOptional()
  age!: number;

  @IsString()
  nationality!: string;

  @IsString()
  origin!: string;

  @IsArray()
  @IsString({ each: true })
  languages!: string[];

  @IsOptional()
  @IsString()
  picture!: string;

  @IsOptional()
  @IsString()
  summary!: string;

  @IsOptional()
  @IsString()
  occupation!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  address!: AddressDTO[];

  @IsArray()
  @IsString({ each: true })
  openTo!: string[];
}
