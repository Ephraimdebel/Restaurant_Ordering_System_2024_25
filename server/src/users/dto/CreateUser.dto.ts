import { IsNotEmpty, MinLength } from "class-validator";
export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
  roleId: number;  
}