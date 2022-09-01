import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async userSignup(@Body() credentials: AuthCredentialsDto): Promise<void> {
    await this.authService.createUser(credentials);
  }

  @Post('/signin')
  async userSignIn(@Body() credentials: AuthCredentialsDto): Promise<string> {
    return await this.authService.signIn(credentials);
  }
}
