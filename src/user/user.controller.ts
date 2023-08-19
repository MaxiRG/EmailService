import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard("jwt"))
  @Get("stats")
  stats() {
    return this.userService.stats();
  }
}
