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

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ id: id });
  }

  isPasswordValidForUser(user: User, password: string): boolean {
    return this.passwordService.arePasswordsSame(user.password, password);
  }
}
