import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API з авторизацією через Keycloak')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'http://localhost:8080/realms/master/protocol/openid-connect/auth',
          tokenUrl: 'http://localhost:8080/realms/master/protocol/openid-connect/token',
          scopes: {
            openid: 'OpenID Connect scope',
          },
        },
        clientCredentials: {
          tokenUrl: 'http://localhost:8080/realms/master/protocol/openid-connect/token',
          scopes: {
            openid: 'OpenID Connect scope',
          },
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
