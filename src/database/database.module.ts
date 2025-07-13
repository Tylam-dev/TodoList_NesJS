import { Global, Module } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { ProviderEnums } from 'src/enums/ProvidersEnum';

@Global()
@Module({
    providers: [
    {
      provide: ProviderEnums.ASYNC_PRISMA_CONNECTION,
      useFactory: async() => {
        let prismaClient = new PrismaClient();
        await prismaClient.$connect()
        return prismaClient;
      }
    }
    ],
    exports: [ProviderEnums.ASYNC_PRISMA_CONNECTION]
})
export class DatabaseModule {}
