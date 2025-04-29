import { Request, Response } from 'express';
import PaymentModel from '../models/Payment';
import { Payment } from '../types/payment';

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments: Payment[] = await PaymentModel.find().populate('vehicleId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const payment = new PaymentModel(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating payment' });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating payment' });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentModel.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment' });
  }
};