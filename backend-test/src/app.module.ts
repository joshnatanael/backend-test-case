import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { MemberBooksModule } from './member-books/member-books.module';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './config/sequelize-config';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [databaseConfig],
    }),
    MembersModule,
    BooksModule,
    MemberBooksModule,
    SequelizeModule.forRoot({
      ...sequelizeConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
