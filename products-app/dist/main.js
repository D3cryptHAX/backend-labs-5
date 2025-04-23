"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map