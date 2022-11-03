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

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Render('index')
  async showForm(): Promise<object> {
    return { message: this.appService.getHello() };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async validatePassword(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<object> {
    const user = await this.userService.findUserByEmail(body.email);

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
}
