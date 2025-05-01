"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PaymentSchema = new mongoose_1.Schema({
    vehicleId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    method: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Payment', PaymentSchema);
