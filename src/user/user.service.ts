import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { User } from './user.entity';
import { PasswordService } from '../common/providers/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email: email });
  }

  isPasswordValidForUser(user: User, password: string): boolean {
    return this.passwordService.arePasswordsSame(user.password, password);
  }
}
