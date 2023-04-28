import {CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {getAuth} from "firebase-admin/auth";
import * as admin from "firebase-admin";
import {Request} from "express";

const firebaseConfig = {
  type: process.env["NX_FIREBASE_TYPE"],
  projectId: process.env["NX_PROJECT_ID"],
  privateKeyId: process.env["NX_PRIVATE_KEY_ID"],
  privateKey: process.env["NX_PRIVATE_KEY"],
  clientEmail: process.env["NX_CLIENT_EMAIL"],
  clientId: process.env["NX_CLIENT_ID"],
  authUri: process.env["NX_AUTH_URI"],
  tokenUri: process.env["NX_TOKEN_URI"],
  authProviderX509CertUrl: process.env["NX_AUTH_PROVIDER_X509_CERT_URL"],
  clientC509CertUrl: process.env["NX_CLIENT_X509_CERT_URL"],
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

@Injectable()
export class AuthGuard implements CanActivate{
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    } else {
      return getAuth().verifyIdToken(token)
        .then((decodedToken) => {
          request["user"] = decodedToken;
          return true;
        })
        .catch((error) => {
          Logger.error(`error: ${error}`);
          throw new UnauthorizedException()
        });
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
