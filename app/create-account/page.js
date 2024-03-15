'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import dotenv from 'dotenv';

import { auth } from '@/app/firebase/firebase-config';
import { useAuth } from '@/app/context/auth-provider';
import Loader from '@/app/components/Loading';

import { addUserToDB } from '@/app/api/user-api';

export default function CreateAccount() {

    dotenv.config();

    const [signInError, setSignInError] = useState(false);
    const [signInErrorMessage, setSignInErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();
    const router = useRouter();

    async function handleCreateAccount(e) {

        e.preventDefault();
        setSignInError(false);
        setSignInErrorMessage("");

        if (!name || !email || !password || !validateEmail(email)) {
            setSignInError(true);
            setSignInErrorMessage("Invalid name, email or password.");
            return;
        } else if (password.length < 8) {
            setSignInError(true);
            setSignInErrorMessage("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const data = {
                    name,
                    email,
                    password,
                    uid: user.uid
                }
                if (user) {
                    addUserToDB(user, data)
                        .then((response) => {
                            if (response) 
                                router.push(`/user/${user.uid}`);
                        })
                        .catch((error) => {
                            setLoading(false);
                            setSignInError(true);
                            setSignInErrorMessage("Error creating user.");
                        }); 
                } else {
                    setLoading(false);
                    setSignInError(true);
                    setSignInErrorMessage("Error creating user.");
                }
            })
            .catch((error) => {
                setLoading(false);
                setSignInError(true);
                setSignInErrorMessage(error.message);
            });
        
    }

    function validateEmail(email) {
        var regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    return (
        
        <div className="px-6 xl:px-36 py-16 my-8">

            {loading?
            <Loader/>
            :

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 w-96">

                <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

                {!currentUser ? 
                <div>

                    <div className="mb-4">
                        <label 
                            htmlFor="name" 
                            className="block text-gray-600 text-sm font-semibold mb-2"
                        >
                            Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Your name" 
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                        <input type="password" id="password" name="password" placeholder="Your password (at least 8 characters)" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                
                    <button className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue" onClick={handleCreateAccount}>
                        Create Account
                    </button>

                    {signInError && 
                        <p className="text-red-600 text-sm mt-4">{signInErrorMessage}</p>
                    }

                </div>

                :

                <p>Please logout to create another account.</p>

                }

            </div>

            }

        </div>

    );

}
