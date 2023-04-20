import {Body, Controller, Get, Inject, Query, Param, Put, Delete} from "@nestjs/common";
import {UserUseCase} from "@back-end/application/usecases/user";
import {UserQuery} from "@back-end/domain/shared/query";
import {UserDTO} from "@back-end/domain/dtos/user";

@Controller("users")
export class UserControllers {
  constructor(
    @Inject("UserInteractors")
    private readonly userUseCase: UserUseCase
  ) {
  }

  @Get()
  async getUserList(@Query() query: UserQuery) {
    return this.userUseCase.getUserList(query);
  }

  @Get(":id")
  async getUser(@Param("id") id: number) {
    return this.userUseCase.getUser(id);
  }

  @Put(":id")
  async updateUser(@Param("id") id: number, @Body() userDTO: UserDTO) {
    return this.userUseCase.updateUser(id, userDTO);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number) {
    return this.userUseCase.deleteUser(id);
  }
}
