import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ArticlesModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
