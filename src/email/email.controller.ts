import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { EmailService } from "./email.service";
import { EmailDto } from "./dto";

@Controller("email")
export class EmailController {
  constructor(private emailService: EmailService) {}
  @UseGuards(AuthGuard("jwt"))
  @Post("send-email")
  sendEmail(@Body() dto: EmailDto) {
    return this.emailService.sendEmail(dto);
  }
}
