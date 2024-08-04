import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change in import
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws/aws-exports';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify with the AWS configuration
Amplify.configure(awsExports);

// Create a root element and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

