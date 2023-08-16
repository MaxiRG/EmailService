import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailDto {
  @IsEmail()
  @IsNotEmpty()
  recipient: string;
  @IsNotEmpty()
  subject: string;
  @IsNotEmpty()
  body: string;
}
