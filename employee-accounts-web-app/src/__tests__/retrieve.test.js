import { render, screen, waitFor } from '@testing-library/react';
import { Retrieve } from './/retrieve.jsx';

test('fetches employees and displays them correctly', async () => {
  // Mock the fetch function
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([
      { pk: 1, 'First Name': 'John', 'Last Name': 'Doe', Position: 'Manager', Address: '123 Main St', City: 'Anytown', State: 'CA', Zip: '12345', Phone: '123-456-7890', Email: 'john.doe@example.com' }
      // Add more mock data as needed
    ]),
  });

  // Render the component
  render(<Retrieve />);

  // Wait for the component to fetch data and update
  await waitFor(() => screen.getByText('John Doe'));

  // Assert that the fetched employee data is displayed correctly
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Position: Manager')).toBeInTheDocument();
  expect(screen.getByText('Location: 123 Main St Anytown, CA 12345')).toBeInTheDocument();
  expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
  expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
});
