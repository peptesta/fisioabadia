import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, User, Mail, Phone, Lock, CheckCircle } from 'lucide-react';

import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const { session, signUpNewUser } = UserAuth() || {};
  const navigate = useNavigate();
  console.log('Sessione utente:', session);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try{
        if (!signUpNewUser) {
            console.error('Errore: signUpNewUser non disponibile');
            return;
        }
        const result = await signUpNewUser(formData.email, formData.password);
        if (result.success) {
            navigate('/');
        } else {
            console.error('Errore durante la registrazione:', result);
        }
    }catch(error){
        console.error('Errore durante la registrazione:', error);
    } finally {
        setIsSubmitted(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-sm shadow-lg p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-[#C9A962]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#C9A962]" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              REGISTRAZIONE COMPLETATA!
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Grazie per esserti registrato. Ora puoi accedere al calendario delle prenotazioni e gestire le tue sessioni.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest px-8 py-3 rounded-sm"
            >
              Torna alla Home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            CREA IL TUO ACCOUNT
          </h2>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Registrati per accedere al calendario delle prenotazioni e gestire le tue sessioni.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSignUp}
              className="bg-white rounded-sm shadow-lg p-8 md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Nome *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Nome"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-12 border-gray-200 focus:border-[#C9A962] focus:ring-[#C9A962] rounded-sm text-sm"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Cognome *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Cognome"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-12 border-gray-200 focus:border-[#C9A962] focus:ring-[#C9A962] rounded-sm text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
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
                      className="pl-10 h-12 border-gray-200 focus:border-[#C9A962] focus:ring-[#C9A962] rounded-sm text-sm"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Cellulare *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+39 300 000 000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-12 border-gray-200 focus:border-[#C9A962] focus:ring-[#C9A962] rounded-sm text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
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
                      className="pl-10 h-12 border-gray-200 focus:border-[#C9A962] focus:ring-[#C9A962] rounded-sm text-sm"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Confermare Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-12 border-gray-200 focus:border-[#C9A962] focus:ring-[#C9A962] rounded-sm text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange('acceptTerms', checked as boolean)
                    }
                    required
                    className="mt-1 border-gray-300 data-[state=checked]:bg-[#C9A962] data-[state=checked]:border-[#C9A962]"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                  >
                    Accetto i{' '}
                    <a href="#" className="text-[#C9A962] hover:underline">
                      termini e condizioni
                    </a>{' '}
                    e la{' '}
                    <a href="#" className="text-[#C9A962] hover:underline">
                      politica sulla privacy
                    </a>{' '}
                    *
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#C9A962] hover:bg-[#B8994F] text-white text-xs tracking-widest py-4 h-auto rounded-sm transition-colors"
              >
                CREA ACCOUNT
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="lg:col-span-2">
            <div className="bg-[#4A4A4A] rounded-sm p-8 md:p-10 text-white">
              <h3 className="text-xl font-semibold mb-6 tracking-wide">
                VANTAGGI DI REGISTRARTI
              </h3>

              <ul className="space-y-5">
                {[
                  {
                    title: 'Gestisci le tue prenotazioni',
                    desc: 'Prenota, modifica o cancella le tue sessioni dal tuo account',
                  },
                  {
                    title: 'Storico dei trattamenti',
                    desc: 'Accedi al tuo storico completo di sessioni e evoluzione',
                  },
                  {
                    title: 'Comunicazione diretta',
                    desc: 'Ti contatterò direttamente per aggiornamenti o comunicazioni importanti',
                  },
                  {
                    title: 'Promemoria appuntamenti',
                    desc: 'Ricevi notifiche delle tue prenotazioni',
                  },
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#C9A962] mr-3 mt-1">•</span>
                    <div>
                      <p className="font-medium text-sm">{benefit.title}</p>
                      <p className="text-xs text-white/70 mt-1">
                        {benefit.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-xs text-white/60 mb-4">
                  Già hai un account?
                </p>
                <a href="/signin" className="text-[#C9A962] hover:underline">
                    <Button
                    variant="outline"
                    className="w-full border-white text-black hover:bg-[#C9A962] hover:text-[#4A4A4A] text-xs tracking-widest py-3 rounded-sm transition-colors"
                    >
                    ACCEDI
                    </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-sm">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default Signup;
