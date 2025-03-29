import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
