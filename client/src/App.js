import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';

import './App.css'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResponsiveAppBar from './components/MenuBar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter >
      <ResponsiveAppBar />
      <Container >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* '*' significa para cualquier otra ruta */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
