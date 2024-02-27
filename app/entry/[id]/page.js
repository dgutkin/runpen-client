'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '../../context/auth-provider';
import PostForm from '../../components/PostForm';
import '../../styles/globals.css'

export default function Entry() {

    const { currentUser } = useAuth();
    const baseUrl = process.env.SERVER_URL || "http://127.0.0.1:8080";

    const pathname = usePathname();
    const entryId = pathname.split("/")[2];
    const router = useRouter();

    const [entryDate, setEntryDate] = useState("");
    const [entryMood, setEntryMood] = useState("");
    const [entryEffort, setEntryEffort] = useState("");
    const [journalId, setJournalId] = useState("");
    const [journalName, setJournalName] = useState("");
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [postData, setPostData] = useState({});

    useEffect(() => {

        if (currentUser) {
            getEntryData();
            getPostList();
        }

    }, []);

    useEffect(() => {

        if (currentUser && journalId) getJournalName();

    }, [journalId])

    async function getEntryData() {

        const token = await currentUser.getIdToken();
        const options = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const url = baseUrl + "/get-entry" + `?entryId=${entryId}`;
        
        await fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            const entryDateAsDate = new Date(result.entryDate);
            const formattedDate = (entryDateAsDate).toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric'});
            setEntryDate(formattedDate);
            setEntryMood(result.emotion);
            setEntryEffort(result.effort);
            setJournalId(result.journalId);
        })
        .catch((error) => {
            // error fetching
            console.log(error);
        });

    }

    async function getJournalName() {

        const token = await currentUser.getIdToken();
        const options = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const url = baseUrl + "/get-journal" + `?journalId=${journalId}`;
        
        await fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            setJournalName(result.journalName);
        })
        .catch((error) => {
            // error fetching
            console.log(error);
        });

    }

    async function getPostList() {

        const token = await currentUser.getIdToken();
        const options = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        }
        const url = baseUrl + "/get-posts" + `?entryId=${entryId}`;

        await fetch(url, options)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            setPosts(result);
        })
        .catch((error) => {
            // no entries
        });

    }

    async function addPostToDB(data) {

        const token = await currentUser.getIdToken();
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
        const url = baseUrl + "/add-post";

        await fetch(url, options)
            .then((response) => {
                return response.text();
            })
            .catch((error) => {
                // add entry error
            });

    }

    async function updatePostToDB(data) {
        
        const token = await currentUser.getIdToken();
        const options = {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
        const url = baseUrl + "/update-post";

        await fetch(url, options)
            .then((response) => {
                return response.text();
            })
            .catch((error) => {
                // update post error
            });

    }

    async function deletePostFromDB(postId) {

        const token = await currentUser.getIdToken();
        const options = {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        }
        const url = baseUrl + "/delete-post" + `?postId=${postId}`;

        await fetch(url, options)
        .then((response) => {
            return response.text();
        })
        .catch((error) => {
            // error deleting journal
        });

    }

    function addPost(formData) {

        setShowPostForm(false);
        addPostToDB(formData);
        getPostList();

    }

    function updatePost(formData) {

        setShowPostForm(false);
        updatePostToDB(formData);
        getPostList();

    }

    function deletePost(postId) {

        setShowPostForm(false);
        deletePostFromDB(postId);
        getPostList();

    }

    if (!currentUser) {

        return (
            <p className="m-4">Access denied.</p>
        );

    } else {

        return (
            <div>
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="text-2xl font-bold ml-8 mt-8">{entryDate}</h1>
                        <h3 className="text-xl text-gray-600 font-bold ml-8 mt-2">{journalName}</h3>
                    </div>
                    
                    {journalId &&
                        <button 
                            className="bg-gray-600 text-white rounded-md m-8 p-2 h-1/2"
                            onClick={() => router.push(`/journal/${journalId}`)}
                        >Back to Journal</button>
                    }
                </div>
                <div className="flex flex-col p-8">
                    <h3 className="text-xl text-gray-500 font-bold mb-4">Vibe</h3>
                    <p className="my-2 px-2">You're feeling {entryMood} and you put in {entryEffort} levels of effort. Great job!</p>
                    <p className="my-2 px-2 italic">Today's Quote: Insert AI-generated quote here.</p>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-xl text-gray-500 font-bold mt-4">Posts</h3>
                        <button 
                            className="bg-dark-green text-white p-2 rounded-md h-1/2"
                            onClick={() => {setShowPostForm(true); setPostData({})}}
                        >
                            Add Post
                        </button>
                    </div>
                    <ul className="flex flex-row flex-wrap py-8">
                        {
                            posts.map((item) => {
                                return (
                                    <li 
                                        key={item.postId} 
                                        className="mb-4 mx-1 bg-white p-4 rounded-md shadow border w-[24%] h-36 hover:animate-wiggle"
                                    >
                                        <button className="h-full w-full flex flex-col" onClick={() => {setShowPostForm(true); setPostData(item)}}>
                                            <h2 className="text-lg font-semibold mb-2">{item.postTitle}</h2>
                                            <p className="text-start text-wrap">{item.postText.slice(0, 50)}{item.postText.length > 50? "..." : ""}</p>
                                        </button>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                {showPostForm && 
                    <PostForm addPost={addPost} updatePost={updatePost} deletePost={deletePost} setShowPostForm={setShowPostForm} entryId={entryId} postData={postData}/>
                }
            </div>
        );

    }

}