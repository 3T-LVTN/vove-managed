import {Controller, Get, Inject} from "@nestjs/common";
import {UserUseCase} from "@back-end/application/usecases/user";

@Controller("users")
export class UserControllers {
  constructor(
    @Inject("UserInteractors")
    private readonly userUseCase: UserUseCase
  ) {
  }

  @Get()
  async getUserList() {
    return this.userUseCase.getUserList();
  }
}
