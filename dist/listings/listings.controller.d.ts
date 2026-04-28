import { ListingsService } from './listings.service';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    findAll(): Promise<import("./listing.schema").ListingDocument[]>;
}
