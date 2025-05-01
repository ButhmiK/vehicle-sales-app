"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var VehicleSchema = new mongoose_1.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Vehicle', VehicleSchema);
