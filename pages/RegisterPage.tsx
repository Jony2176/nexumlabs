import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';

const RegisterPage: React.FC = () => {
  const [orgName, setOrgName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.register({
        organizationName: orgName,
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      setAuth(response);
      toast.success('¡Organización registrada con éxito!');
      navigate('/dashboard', { replace: true });

    } catch (error: any) {
      toast.error(error.message || 'Error en el registro');
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="p-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight theme-text-primary md:text-2xl mb-4">
          Crea una cuenta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="orgName"
            label="Nombre del Estudio Jurídico"
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="firstName"
              label="Nombre"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              id="lastName"
              label="Apellido"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="phone"
            label="Teléfono"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
          <p className="text-sm font-light theme-text-secondary">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium theme-accent hover:underline">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </Card>
  );
};

export default RegisterPage;