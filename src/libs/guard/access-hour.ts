import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TimeAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const actualHour = new Date().getHours();

    if (actualHour >= 18 || actualHour < 6) {
      throw new UnauthorizedException(
        'No sales can be made between 6:00 p.m. and 6:00 a.m. Try again later',
      );
    }

    return true;
  }
}
