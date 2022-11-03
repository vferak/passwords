import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Render('index')
  async showForm(): Promise<object> {
    console.log(await this.userService.findUserByEmail('a@a.cz'));
    return { message: this.appService.getHello() };
  }
}
