import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CdnModule } from './cdn/cdn.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { BrandsModule } from './brands/brands.module';
import { ProductsModule } from './products/products.module';
import { SizeModule } from './size/size.module';
import { TypesModule } from './types/types.module';
import { FlashsellModule } from './flashsell/flashsell.module';
import { BudgetPickModule } from './budget-pick/budget-pick.module';

@Module({
  imports: [
    ConfigModule.forRoot({

      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CdnModule,
    CategoryModule,
    SubCategoryModule,
    BrandsModule,
    ProductsModule,
    SizeModule,
    TypesModule,
    FlashsellModule,
    BudgetPickModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
