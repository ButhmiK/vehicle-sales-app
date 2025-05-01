import { test, expect } from '@playwright/test';

test.describe('Vehicle Management API', () => {
  let token: string;

  // Setup: Register and login to get a token
  test.beforeAll(async ({ request }) => {
    // Register a user
    await request.post('/api/auth/register', {
      data: { email: 'test@example.com', password: 'password123' },
    });

    // Login to get token
    const loginResponse = await request.post('/api/auth/login', {
      data: { email: 'test@example.com', password: 'password123' },
    });
    const loginData = await loginResponse.json();
    token = loginData.token;
  });

  // Test 1: Get all vehicles (unauthenticated)
  test('should get all vehicles without authentication', async ({ request }) => {
    const response = await request.get('/api/vehicles');
    expect(response.ok()).toBeTruthy();
    const vehicles = await response.json();
    expect(vehicles).toBeInstanceOf(Array);
    expect(vehicles.length).toBeGreaterThan(0);
  });

  // Test 2: Create a new vehicle (authenticated)
  test('should create a new vehicle', async ({ request }) => {
    const newVehicle = {
      make: 'Nissan',
      model: 'Altima',
      year: 2023,
      price: 23000,
      type: 'Sedan',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    };
    const response = await request.post('/api/vehicles', {
      headers: { Authorization: `Bearer ${token}` },
      data: newVehicle,
    });
    expect(response.ok()).toBeTruthy();
    const vehicle = await response.json();
    expect(vehicle.make).toBe('Nissan');
    expect(vehicle.model).toBe('Altima');
  });

  // Test 3: Update a vehicle (authenticated)
  test('should update a vehicle', async ({ request }) => {
    // First, create a vehicle to update
    const createResponse = await request.post('/api/vehicles', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        make: 'Nissan',
        model: 'Altima',
        year: 2023,
        price: 23000,
        type: 'Sedan',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      },
    });
    const createdVehicle = await createResponse.json();

    // Update the vehicle
    const response = await request.put(`/api/vehicles/${createdVehicle._id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { price: 24000 },
    });
    expect(response.ok()).toBeTruthy();
    const updatedVehicle = await response.json();
    expect(updatedVehicle.price).toBe(24000);
  });

  // Test 4: Delete a vehicle (authenticated)
  test('should delete a vehicle', async ({ request }) => {
    // First, create a vehicle to delete
    const createResponse = await request.post('/api/vehicles', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        make: 'Nissan',
        model: 'Altima',
        year: 2023,
        price: 23000,
        type: 'Sedan',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      },
    });
    const createdVehicle = await createResponse.json();

    // Delete the vehicle
    const response = await request.delete(`/api/vehicles/${createdVehicle._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.message).toBe('Vehicle deleted');
  });

  // Test 5: Fail to create vehicle without authentication
  test('should fail to create vehicle without authentication', async ({ request }) => {
    const newVehicle = {
      make: 'Nissan',
      model: 'Altima',
      year: 2023,
      price: 23000,
      type: 'Sedan',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    };
    const response = await request.post('/api/vehicles', {
      data: newVehicle,
    });
    expect(response.status()).toBe(401);
    const data = await response.json();
    expect(data.message).toBe('No token provided');
  });
});