import { ExceptionFilter, Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { Request } from 'express';
import {SlackService} from '@back-end/frameworks-and-drivers/adapter'


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  @Inject('SlackService')
  private readonly slackService: SlackService= new SlackService();

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    async () => {
      this.slackService.SendErrorNotification(request.path, error) 
    }
  }
}


