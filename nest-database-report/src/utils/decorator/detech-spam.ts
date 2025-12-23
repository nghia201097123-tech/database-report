import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const BlockSpam = createParamDecorator(
  async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new HttpException('Token không hợp lệ!', HttpStatus.UNAUTHORIZED);
    }

    return request.user;
  },
);
