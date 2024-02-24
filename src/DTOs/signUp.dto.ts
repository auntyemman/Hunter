import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  // IsArray,
  // IsBoolean,
  // IsDate,
  IsEnum,
  MinLength,
  // ValidateNested,
} from 'class-validator';
// import { Type } from 'class-transformer';

enum AccountType {
  Hunter = 'hunter',
  Agent = 'agent',
  Landlord = 'landlord',
}

// enum Gender {
//   Male = 'male',
//   Female = 'female',
// }

// class AddressDTO {
//   @IsString()
//   street?: string;

//   @IsString()
//   city?: string;

//   @IsString()
//   LGA?: string;

//   @IsString()
//   state?: string;

//   @IsString()
//   zipCode?: string;
// }

// class EducationDTO {
//   @IsString()
//   institution?: string;

//   @IsString()
//   degree?: string;

//   @IsString()
//   grade?: string;

//   @IsString()
//   gradYear?: string;
// }

export class SignUpDTO {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsNotEmpty({ message: 'Please provide an account type' })
  @IsString()
  @IsEnum(AccountType)
  accountType?: AccountType;

  @IsNotEmpty({ message: 'Please provide a first name' })
  @IsString()
  firstName?: string;

  @IsNotEmpty({ message: 'Please provide a last name' })
  @IsString()
  lastName?: string;

  // @IsOptional()
  // @IsString()
  // middleName?: string;

  // @IsString()
  // fullName?: string;

  @IsNotEmpty({ message: 'Please provide an email' })
  @IsEmail()
  email?: string;

  @IsNotEmpty({ message: 'Please provide a password' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  // @IsString()
  // phone?: string;

  // @IsString()
  // alternatePhone?: string;

  // @IsOptional()
  // @IsDate()
  // DOB?: Date;

  // @IsOptional()
  // @IsNotEmpty({ message: 'Please provide a gender' })
  // @IsString()
  // @IsEnum(Gender)
  // gender?: Gender;

  // @IsString()
  // nationality?: string;

  // @IsString()
  // height?: string;

  // @IsString()
  // origin?: string;

  // @IsString()
  // skinColor?: string;

  // @IsString()
  // dressSize?: string;

  // @IsArray()
  // @IsString({ each: true })
  // languages?: string[];

  // @IsOptional()
  // @IsString()
  // picture?: string;

  // @IsOptional()
  // @IsString()
  // summary?: string;

  // @IsOptional()
  // @IsString()
  // occupation?: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => AddressDTO)
  // address?: AddressDTO[];

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => EducationDTO)
  // education?: EducationDTO[];

  // @IsArray()
  // @IsString({ each: true })
  // openTo?: string[];

  // @IsOptional()
  // @IsArray()
  // favorites?: { favedBy: string }[];

  // @IsArray()
  // ratings?: { ratedBy: string; house: string; rating: number }[];

  // @IsOptional()
  // @IsBoolean()
  // metaData?: {
  //   verificationCode: string;
  //   isActive: boolean;
  //   createdBy: string;
  //   isOnline: boolean;
  //   lastOnline: Date;
  // };
}
