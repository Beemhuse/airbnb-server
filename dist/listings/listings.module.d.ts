import { OnModuleInit } from '@nestjs/common';
import { ListingsService } from './listings.service';
export declare class ListingsModule implements OnModuleInit {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    onModuleInit(): Promise<void>;
}
