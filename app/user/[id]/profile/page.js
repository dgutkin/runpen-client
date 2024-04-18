'use client'

import { useState, useEffect } from 'react';

import { useAuth } from '@/app/context/auth-provider';
import AccessDenied from '@/app/components/AccessDenied';
import ErrorPage from '@/app/components/ErrorPage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { getBgImageFromDB, updateBgImageToDB } from '@/app/api/user-api';

export default function Profile() {
    
    const USER_BACKGROUNDS = [
        "",
        "https://runpen-images.s3.ca-central-1.amazonaws.com/man_grass.jpg",
        "https://runpen-images.s3.ca-central-1.amazonaws.com/woman_road.jpg",
        "https://runpen-images.s3.ca-central-1.amazonaws.com/woman_field.jpg",
        "https://runpen-images.s3.ca-central-1.amazonaws.com/paper.jpg",
        "https://runpen-images.s3.ca-central-1.amazonaws.com/paper_crumpled.jpg",
        "https://runpen-images.s3.ca-central-1.amazonaws.com/paper_yellow.jpg"
    ];

    const { currentUser } = useAuth();

    const [bgImage, setBgImage] = useState("");

    const [errorPage, setErrorPage] = useState(false);

    useEffect(() => {
        if (currentUser) {
            getBgImage();
        }
    }, []);

    function getBgImage() {
        getBgImageFromDB(currentUser)
            .then((result) => {
                setBgImage(result);
            })
            .catch((error) => {
                setErrorPage(true);
            }); 
    }

    function handleBgImageSelect(imageUrl) {
        updateBgImageToDB(currentUser, imageUrl);
        getBgImage();
    }

    if (!currentUser) {

        return <AccessDenied/>;
    
    } else if (errorPage) {
        
        return <ErrorPage/>;
    
    } else {

        return (
            <div 
                className="flex flex-col px-6 lg:px-36 py-16 h-full overflow-y-auto bg-[#fdfdfd]"
                style={{
                    "backgroundImage": `url(${bgImage})`,
                    "backgroundRepeat": "no-repeat",
                    "backgroundOrigin": "border-box",
                    "backgroundPosition": "center",
                    "backgroundSize": "cover"
                }}
            >
                <h2 className="text-2xl text-gray-900 font-semibold my-8">Profile</h2>

                <h3 className="text-2xl text-gray-700 font-semibold my-2">Backgrounds</h3>


                <div className="flex flex-row flex-wrap gap-4 mx-2 my-4">
                    {USER_BACKGROUNDS.map((item) => {
                        if (item == bgImage) {
                            return (
                                <button 
                                    key={item}   
                                    className="w-32 h-32 rounded-md shadow opacity-50 bg-[#fdfdfd] hover:scale-110" 
                                    style={{
                                        backgroundImage: `url(${item})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover"
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCheck} size="2xl" />
                                </button>
                            )
                        } else {
                            return (
                                <button 
                                    key={item}   
                                    className="w-32 h-32 rounded-md shadow bg-[#fdfdfd] hover:scale-110" 
                                    style={{
                                        backgroundImage: `url(${item})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover"
                                    }}
                                    onClick={() => handleBgImageSelect(item)}
                                />
                            )
                        }
                        })
                    }
                </div>
                
            </div>
        );
    }
}