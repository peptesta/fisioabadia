import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, Lock, CheckCircle } from 'lucide-react';

import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { session, signInUser } = UserAuth() || {};
  const navigate = useNavigate();

  console.log('Sessione utente:', session);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setError(null);
    
    try {
      if (session?.user) {
        console.error('Errore: utente già autenticato');
        return;
      }
      if (!signInUser) {
        console.error('Errore: signInUser non disponibile');
        setError('Servizio di autenticazione non disponibile');
        return;
      }
      
      const result = await signInUser(formData.email, formData.password);
      
      if (result.success) {
        navigate('/');
      } else {
        console.error('Errore durante il login:', result.error);
        setError(result.error?.message || 'Errore durante il login');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      setError('Errore imprevisto');
    } finally {
      setIsSubmitted(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted && !error) {
    return (
      <section className="py-16 md:py-24 bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-sm shadow-lg p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-[#C9A962]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#C9A962]" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              LOGIN COMPLETATO!
            </h3>
            <Button
              onClick={() => navigate('/')}
              className="bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest px-8 py-3 rounded-sm"
            >
              Torna alla Home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (session?.user) {
    return (
      <section className="py-16 md:py-24 bg-[#F5F5F5] min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-sm shadow-lg p-8 md:p-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Sei già autenticato!
            </h3>
            <Button
              onClick={() => navigate('/calendar')}
              className="bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest px-8 py-3 rounded-sm"
            >
              Vai al Calendario
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F5] min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            LOGIN
          </h2>
          <p className="text-sm text-gray-600">
            Accedi al calendario delle prenotazioni e gestisci le tue sessioni.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-sm shadow-lg p-8 md:p-10">
          <form onSubmit={handleSignIn} className="space-y-6">
            
            {/* Email - Sopra */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tua@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-12 border-gray-200 focus:border-[#C9A962] focus:ring-[#C9A962] rounded-sm text-sm w-full"
                />
              </div>
            </div>

            {/* Password - Sotto */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-12 border-gray-200 focus:border-[#C9A962] focus:ring-[#C9A962] rounded-sm text-sm w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest py-4 h-auto rounded-sm transition-colors"
            >
              LOGIN
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-sm text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signin;