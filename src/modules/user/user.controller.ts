import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/enums/rol.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
