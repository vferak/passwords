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
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { Response } from 'express';
import { BaseN } from 'js-combinatorics';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  @Render('index')
  async showForm(): Promise<object> {
    return { message: this.appService.getHello() };
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
    for (const permutation of new BaseN('123456789', 4)) {
      const password = permutation.join('');
      console.log(password);

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
