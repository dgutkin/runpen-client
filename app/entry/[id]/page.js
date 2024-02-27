'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../context/auth-provider';
import PostForm from './PostForm';
import PostCard from './PostCard';

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
                console.log(error);
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
                console.log(error);
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
                console.log(error);
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
                console.log(error);
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
                            className="text-gray-500 rounded-md mt-8 mr-12 hover:scale-125"
                            onClick={() => router.push(`/journal/${journalId}`)}
                        >
                            <FontAwesomeIcon icon={faBook} size="xl"/>
                        </button>
                        
                    }
                </div>
                <div className="flex flex-col p-8">
                    <h3 className="text-xl text-gray-500 font-bold mb-4">Summary</h3>
                    <p className="my-2 px-2">You're feeling {entryMood} and you put in {entryEffort} levels of effort. Great job!</p>
                    <p className="my-2 px-2 italic">Today's Quote: Insert AI-generated quote here.</p>
                    <div className="flex flex-row justify-between">
                        <h3 className="text-xl text-gray-500 font-bold mt-4">Posts</h3>
                        <button 
                            className="bg-dark-green text-white p-2 mx-4 rounded-md h-1/2 hover:bg-yinmn-blue"
                            onClick={() => {setShowPostForm(true); setPostData({})}}
                        >
                            Add Post
                        </button>
                    </div>
                    <ul className="flex flex-row flex-wrap py-8">
                        {
                            posts.map((item) => {
                                return (
                                    <PostCard key={item.postId} data={item} setShowPostForm={setShowPostForm} setPostData={setPostData}/>
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
