import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Listing, ListingSchema } from './listing.schema';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Listing.name, schema: ListingSchema }]),
  ],
  providers: [ListingsService],
  controllers: [ListingsController],
})
export class ListingsModule implements OnModuleInit {
  constructor(private readonly listingsService: ListingsService) {}

  async onModuleInit() {
    await this.listingsService.seed();
  }
}
