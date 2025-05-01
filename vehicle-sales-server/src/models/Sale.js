"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SaleSchema = new mongoose_1.Schema({
    vehicleId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer', required: true },
    saleDate: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Sale', SaleSchema);
