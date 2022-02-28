import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';

import './App.css'

import { AuthProvider } from './context/auth'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResponsiveAppBar from './components/MenuBar';
import NotFound from './pages/NotFound';
import AuthRoute from './utils/AuthRoutes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
        <ResponsiveAppBar />
        <Container >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<AuthRoute />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            {/* '*' significa para cualquier otra ruta */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
