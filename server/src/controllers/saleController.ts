import { Request, Response } from 'express';
import SaleModel from '../models/Sale';
import { Sale } from '../types/sale';

export const getSales = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const query: any = {};
    if (startDate && endDate) {
      query.saleDate = { $gte: startDate, $lte: endDate };
    }
    const sales: Sale[] = await SaleModel.find(query)
      .populate('vehicleId')
      .populate('customerId');
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales' });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const sale = new SaleModel(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sale' });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  try {
    const sale = await SaleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.json(sale);
  } catch (error) {
    res.status(400).json({ message: 'Error updating sale' });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const sale = await SaleModel.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.json({ message: 'Sale deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sale' });
  }
};