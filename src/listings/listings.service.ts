import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Listing, ListingDocument } from './listing.schema';

@Injectable()
export class ListingsService {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
  ) {}

  async findAll(): Promise<ListingDocument[]> {
    return this.listingModel.find().exec();
  }

  async findById(id: string): Promise<ListingDocument> {
    const listing = await this.listingModel.findById(id).exec();
    console.log(listing);
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return listing;
  }

  async seed() {
    const count = await this.listingModel.countDocuments();
    if (count === 0) {
      const seedListings = [
        {
          title: 'Luxury Beachfront Villa',
          description:
            'Stunning 5-bedroom villa with direct access to the white sandy beach. Private pool, chef service, and breathtaking sunset views.',
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
          description:
            'Sleek, minimalist loft in the heart of SoHo. High ceilings, industrial windows, and walking distance to the best restaurants.',
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
          description:
            'Escape to the canopy in this unique, eco-friendly treehouse. Perfect for couples seeking a quiet, nature-filled getaway.',
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
          description:
            'Experience the charm of Tuscany in this 18th-century stone villa. Surrounded by olive groves and vineyards.',
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
          description:
            'A unique dome house under the starry Joshua Tree sky. Outdoor bathtub and fire pit included.',
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
          description:
            'Traditional wooden chalet located right on the slopes. Sauna, fireplace, and heated boot racks.',
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
}
