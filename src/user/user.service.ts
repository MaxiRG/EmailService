import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async stats() {
    const date = new Date().getDate().toString();

    const today =
      new Date().toISOString().slice(0, -16) + date + "T00:00:00.00Z";
    const emails = await this.prisma.email.findMany({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });
    const map: Map<number, number> = new Map();

    for (let i = 0; i < emails.length; i++) {
      const userId = emails.at(i).userId;
      if (map.has(userId)) {
        map.set(userId, map.get(userId) + 1);
      } else {
        map.set(userId, 1);
      }
    }
    const list = [];
    for (const [key, value] of map) {
      list.push(this.formatInfoString(key, value));
    }
    return list;
  }

  formatInfoString(userId: number, amount: number) {
    return "User with id: " + userId + ", sended " + amount + " emails.";
  }
}
