import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { Role } from '../auth/enums/rol.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Auth(Role.ADMIN, Role.EMPRESA)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
