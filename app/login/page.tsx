"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Wrapper } from '@/components/wrapper';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
);

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError('Incorrect email or password. Please try again.');
            setIsLoading(false);
        } else {
            setError('');
            router.push('/dashboard');
        }
    };

    return (
        <Wrapper className="flex flex-col items-center justify-center max-w-lg min-h-screen py-12">
            <Heading>Welcome!</Heading>
            <p className='text-sm mt-2 text-center'>
                Enter Your Email Address And Password To Access 
                <span className='text-app-red font-medium'> Mkhasa</span> Admin Panel
            </p>
            <form onSubmit={handleSubmit} className="w-[90%] md:w-[60%] mx-auto mt-5 gap-3 flex flex-col">                
                <div className="text-left md:text-center">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="text-left md:text-center">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && (
                    <div className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </div>
                )}

                <Button
                    className="w-full rounded-none py-[10px] flex justify-center bg-black text-base text-white font-bold mt-5"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <LoadingSpinner /> : 'Log In'}
                </Button>
            </form>
        </Wrapper>
    );
};

export default LoginPage;
