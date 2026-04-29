import { Controller, Get, Param } from '@nestjs/common';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  async findAll() {
    return this.listingsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.listingsService.findById(id);
  }
}
