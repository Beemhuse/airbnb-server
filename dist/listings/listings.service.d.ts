import { Model } from 'mongoose';
import { ListingDocument } from './listing.schema';
export declare class ListingsService {
    private listingModel;
    constructor(listingModel: Model<ListingDocument>);
    findAll(): Promise<ListingDocument[]>;
    seed(): Promise<void>;
}
