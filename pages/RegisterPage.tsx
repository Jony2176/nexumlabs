import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { CheckCircle } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [orgName, setOrgName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shouldNavigateToDashboard, setShouldNavigateToDashboard] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const responseData = await api.register({
        organizationName: orgName,
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      // Check for auto-login data
      if (responseData && responseData.id && responseData.api_key) {
        // We can auto-login, construct the auth object
        const authData = {
          token: responseData.api_key,
          user: {
            id: responseData.id,
            email: responseData.email,
            firstName: responseData.name || firstName,
            lastName: responseData.last_name || lastName,
            phone: responseData.phone,
            role: responseData.role || 'owner',
            orgId: responseData.org_id || responseData.id,
            onboardingCompleted: responseData.onboarding_completed ?? false,
          },
          organization: {
            id: responseData.org_id || responseData.id,
            name: responseData.organization_name || orgName,
            slug: responseData.slug || responseData.name,
            email: responseData.email,
            phone: responseData.phone,
            modules: responseData.modules || {},
            subscription_status: responseData.subscription_status || 'trialing',
            trial_ends_at: responseData.trial_ends_at || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          }
        };
        setAuth(authData);
        setShouldNavigateToDashboard(true);
        toast.success(`¡Bienvenido, ${authData.user.firstName}! Tu cuenta ha sido creada.`);
      } else {
        // Registration was successful but no auto-login data.
        console.warn("Registro exitoso, pero la respuesta del backend no contenía datos para el inicio de sesión automático:", responseData);
        toast.success("¡Registro exitoso! Ahora puedes iniciar sesión.");
      }

      setIsSuccess(true);

    } catch (error: any) {
      toast.error(error.message || 'Error en el registro');
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card>
        <div className="p-6 sm:p-8 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold theme-text-primary mb-2">¡Registro Exitoso!</h1>
            <p className="theme-text-secondary mb-4">Te hemos enviado un email de bienvenida a <strong>{email}</strong> con los detalles de tu cuenta.</p>
            <p className="theme-text-secondary mb-6">Por favor, revisa tu correo (incluida la carpeta de spam).</p>
            <Button onClick={() => navigate(shouldNavigateToDashboard ? '/app/panel-control' : '/login', { replace: true })}>
              {shouldNavigateToDashboard ? 'Ir al Panel' : 'Ir a Iniciar Sesión'}
            </Button>
        </div>
      </Card>
    );
  }

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