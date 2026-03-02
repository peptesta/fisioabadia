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
      <section className="py-16 md:py-24 bg-[#E8F4F4] min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-lg shadow-lg shadow-[#006B6B]/10 p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-[#7FCFCF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#006B6B]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#006B6B] mb-4">
              LOGIN COMPLETATO!
            </h3>
            <Button
              onClick={() => navigate('/')}
              className="bg-[#006B6B] hover:bg-[#4A9B9B] text-white text-xs tracking-widest px-8 py-3 rounded-md"
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
      <section className="py-16 md:py-24 bg-[#E8F4F4] min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-lg shadow-lg shadow-[#006B6B]/10 p-8 md:p-12 text-center">
            <h3 className="text-2xl font-semibold text-[#006B6B] mb-4">
              Sei già autenticato!
            </h3>
            <Button
              onClick={() => navigate('/')}
              className="bg-[#006B6B] hover:bg-[#4A9B9B] text-white text-xs tracking-widest px-8 py-3 rounded-md"
            >
              Vai alla home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#E8F4F4] min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006B6B] mb-4">
            LOGIN
          </h2>
          <p className="text-sm text-[#006B6B]/70">
            Accedi al calendario delle prenotazioni e gestisci le tue sessioni.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg shadow-[#006B6B]/10 p-8 md:p-10">
          <form onSubmit={handleSignIn} className="space-y-6">
            
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-medium text-[#006B6B] uppercase tracking-wider"
              >
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A9B9B]" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tua@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-12 border-[#7FCFCF]/50 focus:border-[#006B6B] focus:ring-[#006B6B] rounded-md text-sm w-full"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs font-medium text-[#006B6B] uppercase tracking-wider"
              >
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A9B9B]" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-12 border-[#7FCFCF]/50 focus:border-[#006B6B] focus:ring-[#006B6B] rounded-md text-sm w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#006B6B] hover:bg-[#4A9B9B] text-white text-xs tracking-widest py-4 h-auto rounded-md transition-colors shadow-lg shadow-[#006B6B]/20"
            >
              LOGIN
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#006B6B]/70 font-medium">
              Non hai un account?{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="text-[#006B6B] hover:text-[#4A9B9B] font-bold underline transition-colors"
              >
                Registrati
              </button>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signin;