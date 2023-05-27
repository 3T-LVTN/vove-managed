import {ExceptionFilter, Catch, ArgumentsHost, Inject, HttpException} from '@nestjs/common';
import { Request, Response } from 'express';
import {SlackService} from '@back-end/frameworks-and-drivers/adapter'


@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  @Inject('SlackService')
  private readonly slackService: SlackService= new SlackService();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.slackService.SendErrorNotification(request.path, exception)

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
      });
  }
}


