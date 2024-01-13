import { Injectable } from '@nestjs/common';

@Injectable()
export class WelcomeService {
  getHello(name: string): string {
    return `Hello ${name}!`;
  }
}
