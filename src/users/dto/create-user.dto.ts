import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  deliveryaddress?: string;
  division?: string;
  city?: string;
  role?: UserRole;
  picture?: string;
}
