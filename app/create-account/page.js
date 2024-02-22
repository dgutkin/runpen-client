'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../firebase/firebase';

export default function CreateAccount() {

    const [signInError, setSignInError] = useState(false);
    const [signInErrorMessage, setSignInErrorMessage] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    async function handleCreateAccount(e) {

        e.preventDefault();

        const auth = getAuth(firebaseApp);
        let user;

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSignInError(true);
                setSignInErrorMessage(errorMessage);
            });
        
        if (user) {

            const data = {"name": name, "email": email, "password": password};
        
            const options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
            const url = process.env.SERVER_URL || "http://127.0.0.1:8080/add-user";
                
            await fetch(url, options)
                .then((response) => {
                    console.log(response);
                    if (response.status == 201){
                        router.push('/user');
                    } else {
                        setSignInError(true);
                        setSignInErrorMessage(response.text());
                    }
                })
                .catch((error) => {
                    setSignInError(true);
                    setSignInErrorMessage(error);
                });

        }
        
    }

    return (
        
        <div className="container mx-8 max-w-md mt-8">

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">

                <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
    
                <div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600 text-sm font-semibold mb-2">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
                        <input type="password" id="password" name="password" placeholder="Your password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                
                    <button className="bg-dark-green text-white px-4 py-2 rounded-md hover:bg-yinmn-blue" onClick={handleCreateAccount}>
                        Create Account
                    </button>

                    {signInError && 
                        <p className="text-yinmn-blue text-sm mt-4">{signInErrorMessage}</p>
                    }

                </div>

            </div>

        </div>

    );

}
