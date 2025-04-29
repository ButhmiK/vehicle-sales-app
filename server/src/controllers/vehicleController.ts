import { Request, Response } from 'express';
import VehicleModel from '../models/Vehicle';
import { Vehicle } from '../types/vehicle';

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const { price, year, type } = req.query;
    const query: any = {};
    if (price) query.price = { $lte: Number(price) };
    if (year) query.year = Number(year);
    if (type) query.type = type;
    const vehicles: Vehicle[] = await VehicleModel.find(query);
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
};

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = new VehicleModel(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error creating vehicle' });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await VehicleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: 'Error updating vehicle' });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await VehicleModel.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle' });
  }
};