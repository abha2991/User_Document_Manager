// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
// console.log(process.env.DB_USERNAME, process.env.DB_DATABASE);
// @Module({
//   imports: [
//     // TypeOrmModule.forRoot({
//     //   type: 'postgres',
//     //   host: process.env.DB_HOST || 'localhost',
//     //   port: parseInt(process.env.DB_PORT, 10) || 5432,
//     //   username: process.env.DB_USERNAME,
//     //   password: process.env.DB_PASSWORD,
//     //   database: process.env.DB_DATABASE,
//     //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     //   synchronize: true,
//     // }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: '127.0.0.1',
//       port: 5432,
//       username: 'test',
//       password: 'test',
//       database: 'test',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true,
//     }),
//     UsersModule,
//   ],
// })
// export class AppModule {}
//
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
//
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mongodb',
//       url:
//         process.env.MONGODB_ATLAS_URI ||
//         'mongodb+srv://abha:abha@cluster0.z25fnau.mongodb.net/mydatabase?retryWrites=true&w=majority&tls=true',
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//       synchronize: true,
//       logging: true,
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       extra: {
//         tlsAllowInvalidCertificates: true,
//       },
//     }),
//     UsersModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_To7wEiZVz2pn@ep-solitary-cell-a1wheuol-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    DocumentsModule,
    IngestionModule,
    AuthModule,
  ],
})
export class AppModule {}
