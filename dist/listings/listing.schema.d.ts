import { Document } from 'mongoose';
export type ListingDocument = Listing & Document;
export declare class Listing {
    title: string;
    description: string;
    price: number;
    location: string;
    images: string[];
    rating: number;
    reviewsCount: number;
    category: string;
}
export declare const ListingSchema: import("mongoose").Schema<Listing, import("mongoose").Model<Listing, any, any, any, any, any, Listing>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Listing, Document<unknown, {}, Listing, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Listing, Document<unknown, {}, Listing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Listing, Document<unknown, {}, Listing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, Listing, Document<unknown, {}, Listing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, Listing, Document<unknown, {}, Listing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    images?: import("mongoose").SchemaDefinitionProperty<string[], Listing, Document<unknown, {}, Listing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    rating?: import("mongoose").SchemaDefinitionProperty<number, Listing, Document<unknown, {}, Listing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reviewsCount?: import("mongoose").SchemaDefinitionProperty<number, Listing, Document<unknown, {}, Listing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, Listing, Document<unknown, {}, Listing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Listing & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Listing>;
