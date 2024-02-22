'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../firebase/firebase';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [authError, setAuthError] = useState(false);
    const [authErrorMessage, setAuthErrorMessage] = useState("");

    const router = useRouter();

    async function handleLogin(e) {

        e.preventDefault();

        const auth = getAuth(firebaseApp);
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                router.push("/user");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAuthError(true);
                setAuthErrorMessage(errorMessage);
            });

    }

    return (
        
        <div className="flex">
        
            <div className="container mx-8 max-w-md mt-8">

                <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-md">

                    <h2 className="text-2xl font-semibold mb-6">Login</h2>

                    <form>

                        <div className="mb-4 mt-6">
                            <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                    
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                            <input type="password" id="password" name="password" placeholder="Your password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                    
                        <button className="bg-dark-green text-white px-4 py-2 mt-6 rounded-md hover:bg-yinmn-blue" onClick={handleLogin}>
                            Log In
                        </button>

                        {authError && 
                        <p className="text-yinmn-blue text-sm mt-4">{authErrorMessage}</p>
                        }

                    </form>

                </div>

            </div>

        </div>

    );

}
