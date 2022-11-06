import { Global, Module } from '@nestjs/common';
import { PasswordService } from './providers/password.service';
import { CombinatoricsService } from './providers/combinatorics.service';

@Global()
@Module({
  providers: [PasswordService, CombinatoricsService],
  exports: [PasswordService, CombinatoricsService],
})
export class CommonModule {}
