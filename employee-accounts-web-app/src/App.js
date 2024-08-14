import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Layout } from './layout/layout.jsx';
import { About } from './pages/about.jsx';
import { Add } from './pages/add.jsx';
import { Retrieve } from './pages/retrieve.jsx';
import { Update } from './pages/update.jsx';
import { Delete } from './pages/delete.jsx';
import { Home } from './pages/home.jsx';
import { Contact } from './pages/contact.jsx';
import { SignOut } from './pages/signout.jsx';

// import { Authenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    // <Authenticator signUpAttributes={['email']}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="add" element={<Add />} />
            <Route path="retrieve" element={<Retrieve />} />
            <Route path="update" element={<Update />} />
            <Route path="delete" element={<Delete />} />
            <Route path="contact" element={<Contact />} />
            <Route path="signout" element={<SignOut />}/>
          </Route>
        </Routes>
      </div>
    //  </Authenticator>
  );
}

export default App;
