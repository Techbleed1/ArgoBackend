import {
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  bioLink?: string;

  @IsOptional()
  profilePicture?: string;

  @IsOptional()
  coverPicture?: string;

  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthDay?: string;

  @IsOptional()
  profileTheme?: string;

  @IsOptional()
  profileStyle?: string;

  @IsOptional()
  feedStyle?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  privacy?: boolean;

  @IsOptional()
  @IsBoolean()
  showFollow?: boolean;

  @IsOptional()
  @IsBoolean()
  showLike?: boolean;

  @IsOptional()
  @IsBoolean()
  showDislike?: boolean;

  @IsOptional()
  @IsNumber()
  allowance?: number;
}
