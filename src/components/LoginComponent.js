import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/store'; 
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'user@example.com' && password === 'password') {
      dispatch(login({ user: { email }, token: 'sample_token' })); 
      navigate('/'); 
    } else {
      alert('Email atau password salah!');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 text-primary">Login</h2>
      <form onSubmit={handleLogin} className="d-flex flex-column align-items-center">
        <div className="mb-3 w-50">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 w-50">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-50">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
