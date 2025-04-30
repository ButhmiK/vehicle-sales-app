import { Request, Response } from 'express';
import CustomerModel from '../models/Customer';
import { Customer } from '../types/customer';

export const getCustomers = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const customers: Customer[] = await CustomerModel.find(query);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers' });
  }
};

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = new CustomerModel(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating customer' });
  }
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await CustomerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer){  res.status(404).json({ message: 'Customer not found' });
        return; 
      }
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating customer' });
  }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(req.params.id);
    if (!customer){ res.status(404).json({ message: 'Customer not found' });
        return; 
      }
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer' });
  }
};