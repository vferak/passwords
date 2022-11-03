import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  arePasswordsSame(password1: string, password2: string): boolean {
    return password1 === password2;
  }
}
