import mongoose from 'mongoose';
import VehicleModel from '../models/Vehicle';
import CustomerModel from '../models/Customer';
import PaymentModel from '../models/Payment';
import SaleModel from '../models/Sale';

// Use any to bypass strict type checking
const seedData = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/vehicle_sales');

    // Clear existing data
    await (VehicleModel as any).deleteMany({});
    await (CustomerModel as any).deleteMany({});
    await (PaymentModel as any).deleteMany({});
    await (SaleModel as any).deleteMany({});

    // Seed Vehicles
    const vehicles = await (VehicleModel as any).insertMany([
      { make: 'Toyota', model: 'Camry', year: 2020, price: 24000, type: 'Sedan', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70' },
      { make: 'Honda', model: 'Civic', year: 2019, price: 22000, type: 'Sedan', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7' },
      { make: 'Ford', model: 'F-150', year: 2021, price: 35000, type: 'Truck', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7' },
      { make: 'BMW', model: 'X5', year: 2022, price: 45000, type: 'SUV', image: 'https://images.unsplash.com/photo-1505842463080-8a1149d2e462' },
      { make: 'Tesla', model: 'Model 3', year: 2023, price: 40000, type: 'Electric', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7' },
    ]);

    // Seed Customers
    const customers = await (CustomerModel as any).insertMany([
      { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', type: 'Individual' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901', address: '456 Oak St', type: 'Individual' },
      { name: 'ABC Corp', email: 'abc@corp.com', phone: '345-678-9012', address: '789 Pine St', type: 'Business' },
    ]);

    // Seed Payments
    await (PaymentModel as any).insertMany([
      { vehicleId: vehicles[0]._id, amount: 5000, date: '2025-04-01', method: 'Credit Card' },
      { vehicleId: vehicles[1]._id, amount: 3000, date: '2025-04-02', method: 'Bank Transfer' },
      { vehicleId: vehicles[2]._id, amount: 7000, date: '2025-04-03', method: 'Cash' },
    ]);

    // Seed Sales
    await (SaleModel as any).insertMany([
      { vehicleId: vehicles[0]._id, customerId: customers[0]._id, saleDate: '2025-04-10', price: 24000, status: 'Completed' },
      { vehicleId: vehicles[1]._id, customerId: customers[1]._id, saleDate: '2025-04-11', price: 22000, status: 'Pending' },
    ]);

    console.log('Database seeded!');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.connection.close();
  }
};

seedData();