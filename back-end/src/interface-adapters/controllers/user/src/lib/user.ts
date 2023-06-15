import {Body, Controller, Get, Inject, Query, Param, Put, Delete, Logger} from "@nestjs/common";
import {UserUseCase} from "@back-end/application/usecases/user";
import {UserQuery} from "@back-end/domain/shared/query";
import {UserDTO} from "@back-end/domain/dtos/user";
import {Roles} from "@back-end/application/utilities";

@Controller("users")
export class UserControllers {
  constructor(
    @Inject("UserInteractors")
    private readonly userUseCase: UserUseCase
  ) {
  }

  @Get()
  @Roles("admin")
  async getUserList(@Query() query: UserQuery) {
    return this.userUseCase.getUserList(query);
  }

  @Get(":id")
  @Roles("admin")
  async getUser(@Param("id") id: string) {
    return this.userUseCase.getUser(id);
  }

  @Put(":id")
  @Roles("admin")
  async updateUser(@Param("id") id: string, @Body() userDTO: UserDTO) {
    const updatedUserId = await this.userUseCase.updateUser(id, userDTO);
    return {
      userId: updatedUserId
    };
  }

  @Delete(":id")
  @Roles("admin")
  async deleteUser(@Param("id") id: string) {
    const deletedUserId = await this.userUseCase.deleteUser(id);
    return {
      userId: deletedUserId
    };
  }
}
