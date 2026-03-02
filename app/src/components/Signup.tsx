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

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session, signUpNewUser } = UserAuth() || {};
  const navigate = useNavigate();
  console.log('Sessione utente:', session);

  const sanitizeInput = (value: string) => {
    return value.replace(/['";\\]/g, '').trim();
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Email regex semplice e sicura
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Telefono solo numeri (min 6 cifre)
    const phoneRegex = /^[0-9]{6,15}$/;

    if (!emailRegex.test(formData.email)) {
      errors.email = 'Formato email non valido (esempio: nome@email.com)';
    }

    if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Il numero deve contenere solo cifre';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Le password non coincidono';
    }

    if (formData.password.length < 6) {
      errors.password = 'La password deve avere almeno 6 caratteri';
    }

    return errors;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitted(true);

    try {
      if (!signUpNewUser) return;

      const result = await signUpNewUser(
        sanitizeInput(formData.email),
        sanitizeInput(formData.password),
        {
          data: {
            firstName: sanitizeInput(formData.firstName),
            lastName: sanitizeInput(formData.lastName),
            phone: sanitizeInput(formData.phone),
          }
        }
      );

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error.message);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitted(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === 'phone') {
      newValue = value.replace(/\D/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-24 bg-[#E8F4F4]">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg shadow-[#006B6B]/10 p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-[#7FCFCF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#006B6B]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#006B6B] mb-4">
              REGISTRAZIONE COMPLETATA!
            </h3>
            <p className="text-sm text-[#006B6B]/70 mb-6">
              Grazie per esserti registrato. Ora puoi accedere al calendario delle prenotazioni e gestire le tue sessioni.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#006B6B] hover:bg-[#4A9B9B] text-white text-xs tracking-widest px-8 py-3 rounded-md"
            >
              Torna alla Home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#E8F4F4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006B6B] mb-4">
            CREA IL TUO ACCOUNT
          </h2>
          <p className="text-sm text-[#006B6B]/70 max-w-lg mx-auto">
            Registrati per accedere al calendario delle prenotazioni e gestire le tue sessioni.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSignUp}
              className="bg-white rounded-lg shadow-lg shadow-[#006B6B]/10 p-8 md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-xs font-medium text-[#006B6B] uppercase tracking-wider"
                  >
                    Nome *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A9B9B]" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Nome"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-12 border-[#7FCFCF]/50 focus:border-[#006B6B] focus:ring-[#006B6B] rounded-md text-sm"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-xs font-medium text-[#006B6B] uppercase tracking-wider"
                  >
                    Cognome *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A9B9B]" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Cognome"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 h-12 border-[#7FCFCF]/50 focus:border-[#006B6B] focus:ring-[#006B6B] rounded-md text-sm"
                    />
                  </div>
                </div>

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
                      className={`pl-10 h-12 border-[#7FCFCF]/50 focus:border-[#006B6B] focus:ring-[#006B6B] rounded-md text-sm ${
                        fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                      }`}                    />
                    {fieldErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-medium text-[#006B6B] uppercase tracking-wider"
                  >
                    Cellulare *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A9B9B]" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+39 300 000 000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`pl-10 h-12 border-[#7FCFCF]/50 focus:border-[#006B6B] focus:ring-[#006B6B] rounded-md text-sm ${
                        fieldErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                      }`}                    />
                    {fieldErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.phone}
                    </p>
                  )}
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
                      className={`pl-10 h-12 border-[#7FCFCF]/50 focus:border-[#006B6B] focus:ring-[#006B6B] rounded-md text-sm ${
                        fieldErrors.password
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}                    />
                      {fieldErrors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-xs font-medium text-[#006B6B] uppercase tracking-wider"
                  >
                    Confermare Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A9B9B]" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className={`pl-10 h-12 border-[#7FCFCF]/50 focus:border-[#006B6B] focus:ring-[#006B6B] rounded-md text-sm ${                        fieldErrors.confirmPassword
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`} />
                      {fieldErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {fieldErrors.confirmPassword}
                      </p>
                    )}
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
                    className="mt-1 border-[#7FCFCF] data-[state=checked]:bg-[#006B6B] data-[state=checked]:border-[#006B6B]"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-xs text-[#006B6B]/70 leading-relaxed cursor-pointer"
                  >
                    Accetto i{' '}
                    <a href="#" className="text-[#4A9B9B] hover:underline">
                      termini e condizioni
                    </a>{' '}
                    e la{' '}
                    <a href="#" className="text-[#4A9B9B] hover:underline">
                      politica sulla privacy
                    </a>{' '}
                    *
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#006B6B] hover:bg-[#4A9B9B] text-white text-xs tracking-widest py-4 h-auto rounded-md transition-colors shadow-lg shadow-[#006B6B]/20"
              >
                CREA ACCOUNT
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="lg:col-span-2">
            <div className="bg-[#006B6B] rounded-lg p-8 md:p-10 text-white shadow-lg shadow-[#006B6B]/20">
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
                    <span className="text-[#7FCFCF] mr-3 mt-1">•</span>
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
                <a href="/signin" className="text-[#7FCFCF] hover:underline">
                    <Button
                    variant="outline"
                    className="w-full border-white text-[#006B6B] hover:bg-[#4A9B9B] hover:text-white text-xs tracking-widest py-3 rounded-md transition-colors"
                    >
                    ACCEDI
                    </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};

export default Signup;