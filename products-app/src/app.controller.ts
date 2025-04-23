import { Controller, Get, Post, Body } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';

@Controller('products')
export class ProductsController {
  @Get()
  @Roles({ roles: ['ProductsApiViewer'] })
  getProducts() {
    return ['Product A', 'Product B'];
  }

  @Post()
  @Roles({ roles: ['ProductsApiWriter'] })
  createProduct(@Body() product: any) {
    return { message: 'Created', product };
  }
}
