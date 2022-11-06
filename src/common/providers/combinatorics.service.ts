import { Injectable } from '@nestjs/common';
import { BaseN } from 'js-combinatorics';

@Injectable()
export class CombinatoricsService {
  private static readonly NUMBERS = '123456789';
  private static readonly CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly SPECIAL_CHARACTERS = '/*-+<>,.?;:=!@#$%^&';

  getBaseNForUserId(userId: string): BaseN<string> {
    if (userId === '1') {
      return new BaseN(CombinatoricsService.NUMBERS, 4);
    }

    if (userId === '2') {
      return new BaseN(CombinatoricsService.NUMBERS, 5);
    }

    if (userId === '3') {
      return new BaseN(CombinatoricsService.CHARACTERS, 4);
    }

    if (userId === '4') {
      return new BaseN(
        CombinatoricsService.NUMBERS + CombinatoricsService.CHARACTERS,
        4,
      );
    }

    if (userId === '5') {
      return new BaseN(
        CombinatoricsService.NUMBERS +
          CombinatoricsService.CHARACTERS +
          CombinatoricsService.SPECIAL_CHARACTERS,
        4,
      );
    }
  }
}
