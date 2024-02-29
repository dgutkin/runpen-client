'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '@/app/context/auth-provider';
import AccessDenied from '@/app/components/AccessDenied';
import Loader from '@/app/components/Loader';
import { getJournalFromDB } from '@/app/api/journal-api';
import { getEntryFromDB } from '@/app/api/entry-api';
import { addPostToDB, deletePostFromDB, getPostsFromDB, updatePostToDB } from '@/app/api/post-api';

import PostForm from './PostForm';
import PostCard from './PostCard';

export default function Entry() {

    const { currentUser } = useAuth();

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

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (currentUser) {
            getEntryData();
            getPostList();
        }

    }, []);

    useEffect(() => {

        if (currentUser && journalId) getJournalName();

    }, [journalId])

    function getEntryData() {
        getEntryFromDB(currentUser, entryId).then((result) => {
            const entryDateAsDate = new Date(result.entryDate);
            const formattedDate = (entryDateAsDate).toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric'});
            setEntryDate(formattedDate);
            setEntryMood(result.emotion);
            setEntryEffort(result.effort);
            setJournalId(result.journalId);
        });
    }
    
    function getJournalName() {
        getJournalFromDB(currentUser, journalId).then((result) => {
            setJournalName(result.journalName);
        });
    }

    function getPostList() {
        getPostsFromDB(currentUser, entryId).then((result) => {
            setPosts(result);
        });
    }
    

    function addPost(formData) {
        setShowPostForm(false);
        addPostToDB(currentUser, formData).then(() => {
            getPostList();
        });
    }

    function updatePost(formData) {
        setShowPostForm(false);
        updatePostToDB(currentUser, formData).then(() => {
            getPostList();
        });
    }

    function deletePost(postId) {
        setShowPostForm(false);
        deletePostFromDB(currentUser, postId).then(() => {
            getPostList();
        });
    }

    function closeEntry() {
        setLoading(true);
        router.push(`/journal/${journalId}`);
    }

    if (!currentUser) {

        return <AccessDenied/>;

    } else if (loading) {
        
        return <Loader/>;

    } else {

        return (
            <div className="px-36">
                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="text-2xl font-bold ml-8 mt-8">{entryDate}</h1>
                        <h3 className="text-xl text-gray-600 font-bold ml-8 mt-2">{journalName}</h3>
                    </div>
                    
                    {journalId &&
                        <button 
                            className="text-gray-400 rounded-md mt-8 mr-12 hover:scale-125"
                            onClick={closeEntry}
                        >
                            <FontAwesomeIcon icon={faX} size="xl"/>
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
                                    <PostCard 
                                        key={item.postId} 
                                        data={item} 
                                        setShowPostForm={setShowPostForm} 
                                        setPostData={setPostData}
                                    />
                                );
                            })
                        }
                    </ul>
                </div>
                {showPostForm && 
                    <PostForm 
                        addPost={addPost} 
                        updatePost={updatePost}
                        deletePost={deletePost} 
                        setShowPostForm={setShowPostForm} 
                        entryId={entryId} 
                        postData={postData}
                    />
                }
            </div>
        );

    }

}
