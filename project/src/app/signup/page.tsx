"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signUp } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Lock, User, Phone } from 'lucide-react';

const signupSchema = z.object({
  username: z.string().min(2, 'שם משתמש חייב להכיל לפחות 2 תווים'),
  email: z.string().email('כתובת אימייל לא תקינה'),
  phone: z.string().regex(/^05\d{8}$/, 'מספר טלפון לא תקין'),
  password: z.string().min(6, 'סיסמה חייבת להכיל לפחות 6 תווים'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "הסיסמאות אינן תואמות",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setError('');
      const { confirmPassword, ...signUpData } = data;
      await signUp(signUpData);
      router.push('/services');
    } catch (err: any) {
      setError(err.message || 'שגיאה בהרשמה. אנא נסה שוב מאוחר יותר.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MoneyTime
          </h1>
          <p className="mt-2 text-gray-600">
            הצטרפו אלינו! צרו חשבון חדש
          </p>
        </div>
        
        <Card className="border-2">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="relative">
                  <Input
                    placeholder="שם משתמש"
                    {...register('username')}
                    className="text-right pr-10"
                    dir="rtl"
                  />
                  <User className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1 text-right">{errors.username.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="אימייל"
                    {...register('email')}
                    className="text-right pr-10"
                    dir="rtl"
                  />
                  <Mail className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 text-right">{errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="טלפון (05xxxxxxxx)"
                    {...register('phone')}
                    className="text-right pr-10"
                    dir="rtl"
                  />
                  <Phone className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 text-right">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="סיסמה"
                    {...register('password')}
                    className="text-right pr-10"
                    dir="rtl"
                  />
                  <Lock className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 text-right">{errors.password.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="אימות סיסמה"
                    {...register('confirmPassword')}
                    className="text-right pr-10"
                    dir="rtl"
                  />
                  <Lock className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 text-right">{errors.confirmPassword.message}</p>
                )}
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-center text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'נרשם...' : 'הרשם'}
              </Button>

              <p className="text-center text-gray-600">
                כבר יש לך חשבון?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  התחבר כאן
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}