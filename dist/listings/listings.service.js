"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const listing_schema_1 = require("./listing.schema");
let ListingsService = class ListingsService {
    listingModel;
    constructor(listingModel) {
        this.listingModel = listingModel;
    }
    async findAll() {
        return this.listingModel.find().exec();
    }
    async findById(id) {
        const listing = await this.listingModel.findById(id).exec();
        console.log(listing);
        if (!listing) {
            throw new common_1.NotFoundException('Listing not found');
        }
        return listing;
    }
    async seed() {
        const count = await this.listingModel.countDocuments();
        if (count === 0) {
            const seedListings = [
                {
                    title: 'Luxury Beachfront Villa',
                    description: 'Stunning 5-bedroom villa with direct access to the white sandy beach. Private pool, chef service, and breathtaking sunset views.',
                    price: 850,
                    location: 'Malibu, California',
                    images: [
                        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000',
                    ],
                    guests: 10,
                    bedrooms: 5,
                    bathrooms: 4,
                    amenities: [
                        'Pool',
                        'Hot tub',
                        'Beach access',
                        'Fireplace',
                        'WiFi',
                        'Kitchen',
                    ],
                    propertyType: 'Villa',
                    rating: 4.95,
                    reviewsCount: 128,
                    category: 'Beachfront',
                },
                {
                    title: 'Modern Loft in Manhattan',
                    description: 'Sleek, minimalist loft in the heart of SoHo. High ceilings, industrial windows, and walking distance to the best restaurants.',
                    price: 320,
                    location: 'New York, New York',
                    images: [
                        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
                    ],
                    guests: 4,
                    bedrooms: 2,
                    bathrooms: 2,
                    amenities: [
                        'Elevator',
                        'Air conditioning',
                        'WiFi',
                        'Washer',
                        'Kitchen',
                    ],
                    propertyType: 'Loft',
                    rating: 4.88,
                    reviewsCount: 245,
                    category: 'Amazing cities',
                },
                {
                    title: 'Cozy Treehouse Retreat',
                    description: 'Escape to the canopy in this unique, eco-friendly treehouse. Perfect for couples seeking a quiet, nature-filled getaway.',
                    price: 180,
                    location: 'Asheville, North Carolina',
                    images: [
                        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000',
                    ],
                    guests: 2,
                    bedrooms: 1,
                    bathrooms: 1,
                    amenities: [
                        'Indoor fireplace',
                        'Patio',
                        'Self check-in',
                        'WiFi',
                        'Coffee maker',
                    ],
                    propertyType: 'Treehouse',
                    rating: 4.92,
                    reviewsCount: 86,
                    category: 'Treehouses',
                },
                {
                    title: 'Historic Italian Villa',
                    description: 'Experience the charm of Tuscany in this 18th-century stone villa. Surrounded by olive groves and vineyards.',
                    price: 450,
                    location: 'Siena, Italy',
                    images: [
                        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1000',
                    ],
                    guests: 12,
                    bedrooms: 6,
                    bathrooms: 5,
                    amenities: [
                        'Private pool',
                        'Fireplace',
                        'Washer',
                        'Kitchen',
                        'Parking',
                    ],
                    propertyType: 'Villa',
                    rating: 4.97,
                    reviewsCount: 152,
                    category: 'Castles',
                },
                {
                    title: 'Desert Oasis Dome',
                    description: 'A unique dome house under the starry Joshua Tree sky. Outdoor bathtub and fire pit included.',
                    price: 210,
                    location: 'Joshua Tree, California',
                    images: [
                        'https://images.unsplash.com/photo-1502301103665-0b95cc738def?auto=format&fit=crop&q=80&w=1000',
                    ],
                    guests: 4,
                    bedrooms: 2,
                    bathrooms: 2,
                    amenities: ['Hot tub', 'Stargazing deck', 'Outdoor shower', 'WiFi'],
                    propertyType: 'Dome house',
                    rating: 4.85,
                    reviewsCount: 112,
                    category: 'Oasis',
                },
                {
                    title: 'Ski-in Ski-out Chalet',
                    description: 'Traditional wooden chalet located right on the slopes. Sauna, fireplace, and heated boot racks.',
                    price: 520,
                    location: 'Whistler, BC, Canada',
                    images: [
                        'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=1000',
                    ],
                    guests: 8,
                    bedrooms: 4,
                    bathrooms: 3,
                    amenities: ['Sauna', 'Fireplace', 'Ski storage', 'Hot tub', 'WiFi'],
                    propertyType: 'Chalet',
                    rating: 4.91,
                    reviewsCount: 94,
                    category: 'Skiing',
                },
            ];
            await this.listingModel.insertMany(seedListings);
            console.log('Database seeded with Airbnb listings');
        }
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(listing_schema_1.Listing.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ListingsService);
//# sourceMappingURL=listings.service.js.map