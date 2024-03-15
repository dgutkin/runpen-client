'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/app/firebase/firebase-config';
import { useAuth } from '@/app/context/auth-provider';
import Loader from '@/app/components/Loading';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState(false);
    const [authErrorMessage, setAuthErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();
    const router = useRouter();

    async function handleLogin(e) {

        e.preventDefault();

        if (!email || !password || !validateEmail(email)) {
            setAuthError(true);
            setAuthErrorMessage("Invalid email or password");
            return;
        }

        setLoading(true);
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push(`/user/${user.uid}`);
            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                setAuthError(true);
                setAuthErrorMessage(errorMessage);
            });

    }

    function validateEmail(email) {
        var regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    return (
        
        <div className="px-6 xl:px-36 py-16">
        
            <div className="my-8 w-1/2">

                {loading?
                <Loader/>
                :

                <div className="p-8 border border-gray-200 rounded-lg shadow-md w-96">

                    <h2 className="text-2xl font-semibold mb-6">Login</h2>
                    
                    {!currentUser ? 
                        
                    <form>

                        <div className="mb-4 mt-6">
                            <label 
                                htmlFor="email" 
                                className="block text-gray-600 text-sm font-semibold mb-2"
                            >
                                Email
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Your email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                    
                        <div className="mb-6">
                            <label 
                                htmlFor="password" 
                                className="block text-gray-600 text-sm font-semibold mb-2"
                            >
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Your password" 
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                    
                        <button 
                            className="bg-dark-green text-white px-4 py-2 mt-6 rounded-md hover:bg-yinmn-blue" 
                            onClick={handleLogin}
                        >
                            Log In
                        </button>

                        {authError && 
                        <p className="text-red-600 text-sm mt-4">{authErrorMessage}</p>
                        }

                    </form>

                    :

                    <p>You're already logged in.</p>

                    }

                </div>
                }

            </div>

        </div>

    );

}
