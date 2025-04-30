"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Vehicle_1 = require("../models/Vehicle");
var Customer_1 = require("../models/Customer");
var Payment_1 = require("../models/Payment");
var Sale_1 = require("../models/Sale");
var seedData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var vehicles, customers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 13]);
                return [4 /*yield*/, mongoose_1.default.connect('mongodb://localhost:27017/vehicle_sales')];
            case 1:
                _a.sent();
                // Clear existing data
                return [4 /*yield*/, Vehicle_1.default.deleteMany({})];
            case 2:
                // Clear existing data
                _a.sent();
                return [4 /*yield*/, Customer_1.default.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, Payment_1.default.deleteMany({})];
            case 4:
                _a.sent();
                return [4 /*yield*/, Sale_1.default.deleteMany({})];
            case 5:
                _a.sent();
                return [4 /*yield*/, Vehicle_1.default.insertMany([
                        { make: 'Toyota', model: 'Camry', year: 2020, price: 24000, type: 'Sedan', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70' },
                        { make: 'Honda', model: 'Civic', year: 2019, price: 22000, type: 'Sedan', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7' },
                        { make: 'Ford', model: 'F-150', year: 2021, price: 35000, type: 'Truck', image: 'https://images.unsplash.com/photo-1507136566006-22e04e2e7203' },
                        { make: 'BMW', model: 'X5', year: 2022, price: 45000, type: 'SUV', image: 'https://images.unsplash.com/photo-1505842463080-8a1149d2e462' },
                        { make: 'Tesla', model: 'Model 3', year: 2023, price: 40000, type: 'Electric', image: 'https://images.unsplash.com/photo-1561047029-423e2a7b66b9' },
                    ])];
            case 6:
                vehicles = _a.sent();
                return [4 /*yield*/, Customer_1.default.insertMany([
                        { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', type: 'Individual' },
                        { name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901', address: '456 Oak St', type: 'Individual' },
                        { name: 'ABC Corp', email: 'abc@corp.com', phone: '345-678-9012', address: '789 Pine St', type: 'Business' },
                    ])];
            case 7:
                customers = _a.sent();
                // Seed Payments
                return [4 /*yield*/, Payment_1.default.insertMany([
                        { vehicleId: vehicles[0]._id, amount: 5000, date: '2025-04-01', method: 'Credit Card' },
                        { vehicleId: vehicles[1]._id, amount: 3000, date: '2025-04-02', method: 'Bank Transfer' },
                        { vehicleId: vehicles[2]._id, amount: 7000, date: '2025-04-03', method: 'Cash' },
                    ])];
            case 8:
                // Seed Payments
                _a.sent();
                // Seed Sales
                return [4 /*yield*/, Sale_1.default.insertMany([
                        { vehicleId: vehicles[0]._id, customerId: customers[0]._id, saleDate: '2025-04-10', price: 24000, status: 'Completed' },
                        { vehicleId: vehicles[1]._id, customerId: customers[1]._id, saleDate: '2025-04-11', price: 22000, status: 'Pending' },
                    ])];
            case 9:
                // Seed Sales
                _a.sent();
                console.log('Database seeded!');
                return [4 /*yield*/, mongoose_1.default.connection.close()];
            case 10:
                _a.sent();
                return [3 /*break*/, 13];
            case 11:
                error_1 = _a.sent();
                console.error('Error seeding database:', error_1);
                return [4 /*yield*/, mongoose_1.default.connection.close()];
            case 12:
                _a.sent();
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
seedData();
