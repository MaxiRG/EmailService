import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EmailService } from "./email.service";
import { EmailDto } from "./dto";
import { GetUser } from "../auth/decorator";

@Controller("email")
export class EmailController {
  constructor(private emailService: EmailService) {}
  @UseGuards(AuthGuard("jwt"))
  @Post("send-email")
  sendEmail(@Body() dto: EmailDto, @GetUser("id") userId: number) {
    return this.emailService.sendEmail(dto, userId);
  }
}
