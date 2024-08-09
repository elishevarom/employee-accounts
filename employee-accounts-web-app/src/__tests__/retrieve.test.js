import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Retrieve } from '../pages/retrieve.jsx';
import React from 'react';

test('fetches employees and displays them correctly', async () => {
  // Mock the fetchEmployees function which returns an employee's info
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([
      { pk: 1, 'First Name': 'John', 'Last Name': 'Doe', Position: 'Manager', Address: '123 Main St', City: 'Anytown', State: 'CA', Zip: '12345', Phone: '123-456-7890', Email: 'john.doe@example.com' }
    ]),
  });

  //creates a virtual DOM of the Retrieve component
  render(<Retrieve />); 

  await waitFor(() => screen.getByText('View Employee Profiles'));

  // Select the dropdown option and click it
  fireEvent.click(screen.getByRole('button', { name: /Select an Employee/i }));

  await waitFor(() => screen.getByText('John Doe'));

// Select the employee from the dropdown
  fireEvent.click(screen.getByRole('button', { name: /John Doe/i }));

  // Wait for the component to fetch data and update
  await waitFor(() => screen.getByText((content, element) => 
  content.includes('Position: Manager')
  ));

  // AEnsure that the fetched employee data is displayed correctly
  expect(screen.getByText('John Doe', { selector: '.card-title' })).toBeInTheDocument();
  screen.getByText((content, element) => 
    content.includes('Position: Manager'));
  screen.getByText((content, element) => 
    content.includes('Location: 123 Main St Anytown, CA 12345'));

  screen.getByText((content, element) => 
    content.includes('Phone: 123-456-7890'));
  screen.getByText((content, element) => 
    content.includes('Email: john.doe@example.com'));
  // expect(screen.getByText('Position: Manager')).toBeInTheDocument();
  // expect(screen.getByText('Location: 123 Main St Anytown, CA 12345')).toBeInTheDocument();
  // expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
  // expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
});
