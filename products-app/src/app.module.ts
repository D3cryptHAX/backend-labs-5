import { Module } from '@nestjs/common';
import { ProductsController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'master',
      clientId: 'products-app',
      secret: 'CEjztiTrVKlLRu0frnUppCg72Cpkc4ml', 
    }),
  ],
  controllers: [ProductsController],
  providers: [AppService],
})
export class AppModule {}
