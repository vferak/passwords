import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CombinatoricsService } from './common/providers/combinatorics.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly combinatoricsService: CombinatoricsService,
  ) {}

  @Get()
  @Render('index')
  async showForm(): Promise<object> {
    const users = await this.userService.findAll();

    return {
      users: users.map((user) => ({ id: user.id, name: user.name })),
    };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async validatePassword(
    @Body() body: { id: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    if (body.id === '') {
      response.status(HttpStatus.BAD_REQUEST);
      return {};
    }

    const user = await this.userService.findUserById(parseInt(body.id));

    if (user === null) {
      response.status(HttpStatus.BAD_REQUEST);
      return {};
    }

    const isPasswordValid = this.userService.isPasswordValidForUser(
      user,
      body.password,
    );

    if (!isPasswordValid) {
      response.status(HttpStatus.BAD_REQUEST);
      return {};
    }
  }

  @Post('server-attack')
  @HttpCode(HttpStatus.OK)
  async serverAttack(
    @Body() body: { id: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    const baseN = this.combinatoricsService.getBaseNForUserId(body.id);

    for (const permutation of baseN) {
      const password = permutation.join('');

      const data = { id: body.id, password: password };
      try {
        const response = await firstValueFrom(
          this.httpService.post('http://localhost:3000', data),
        );

        if (response.status === 200) {
          return { password: password };
        }
      } catch (err) {}
    }

    response.status(HttpStatus.BAD_REQUEST);
    return {};
  }
}
