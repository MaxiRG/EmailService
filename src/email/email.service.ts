import { Injectable } from "@nestjs/common";
import { EmailDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EmailService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}
  async sendEmail(dto: EmailDto, userId: number) {
    this.sendGridProvider(dto);
    const email = await this.prisma.email.create({
      data: {
        userId: userId,
      },
    });
    return email;
  }
  sendGridProvider(dto: EmailDto) {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(this.config.get("SENDGRID_API_KEY"));
    const msg = {
      to: dto.recipient,
      from: this.config.get("SENDGRID_MAIL"),
      subject: dto.subject,
      text: dto.body,
      html: "<div>" + dto.body.toString() + "</div>",
    };
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      },
    );
  }
}
