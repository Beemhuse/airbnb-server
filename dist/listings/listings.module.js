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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const listing_schema_1 = require("./listing.schema");
const listings_service_1 = require("./listings.service");
const listings_controller_1 = require("./listings.controller");
let ListingsModule = class ListingsModule {
    listingsService;
    constructor(listingsService) {
        this.listingsService = listingsService;
    }
    async onModuleInit() {
        await this.listingsService.seed();
    }
};
exports.ListingsModule = ListingsModule;
exports.ListingsModule = ListingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: listing_schema_1.Listing.name, schema: listing_schema_1.ListingSchema }]),
        ],
        providers: [listings_service_1.ListingsService],
        controllers: [listings_controller_1.ListingsController],
    }),
    __metadata("design:paramtypes", [listings_service_1.ListingsService])
], ListingsModule);
//# sourceMappingURL=listings.module.js.map