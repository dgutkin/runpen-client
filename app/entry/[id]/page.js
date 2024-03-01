'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '@/app/context/auth-provider';
import AccessDenied from '@/app/components/AccessDenied';
import Loader from '@/app/components/Loader';
import DeleteConfirm from '@/app/components/DeleteConfirm';
import { getJournalFromDB } from '@/app/api/journal-api';
import { deleteEntryFromDB, getEntryFromDB, updateEntryToDB } from '@/app/api/entry-api';
import { addPostToDB, deletePostFromDB, getPostsFromDB, updatePostToDB } from '@/app/api/post-api';

import EntryForm from './EntryForm';
import PostForm from './PostForm';
import PostCard from './PostCard';

export default function Entry() {

    const { currentUser } = useAuth();

    const pathname = usePathname();
    const entryId = pathname.split("/")[2];
    const router = useRouter();

    const [entryDateFormatted, setEntryDateFormatted] = useState("");
    const [entry, setEntry] = useState("");
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [showEntryDeleteConfirm, setShowEntryDeleteConfirm] = useState(false);

    const [journalId, setJournalId] = useState("");
    const [journalName, setJournalName] = useState("");

    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [postData, setPostData] = useState({});
    const [noPosts, setNoPosts] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (currentUser) {
            getEntryData();
            getPostList();
        }

    }, []);

    useEffect(() => {

        if (currentUser && journalId) getJournalName();

    }, [journalId]);

    useEffect(() => {
        checkNoPosts();
    }, [posts])

    function checkNoPosts() {
        if (!posts.length) {
            setNoPosts(true);
        } else {
            setNoPosts(false);
        }
    }

    function getJournalName() {
        getJournalFromDB(currentUser, journalId).then((result) => {
            setJournalName(result.journalName);
        });
    }

    function getEntryData() {
        getEntryFromDB(currentUser, entryId).then((result) => {
            const entryDateAsDate = new Date(result.entryDate);
            const formattedDate = (entryDateAsDate).toLocaleString('en-us', {month: 'short', day: 'numeric', year: 'numeric'});
            setEntryDateFormatted(formattedDate);
            setEntry(result);
            setJournalId(result.journalId);
        });
    }

    function updateEntry(formData) {
        setShowEntryForm(false);
        updateEntryToDB(currentUser, formData).then(() => {
            getEntryData();
        });
    }

    function deleteEntry() {
        deleteEntryFromDB(currentUser, entryId).then(() => {
            closeEntry();
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
                        <h3 className="text-xl font-semibold ml-8 mt-8">{entryDateFormatted}</h3>
                        <h3 className="text-xl text-gray-600 font-semibold ml-8 mt-2">{journalName}</h3>
                    </div>
                    {journalId &&
                        <div className="flex flex-row">
                            <button 
                                className="text-gray-500 rounded-md mr-6 hover:scale-125"
                                onClick={() => setShowEntryForm(true)}
                            >
                                <FontAwesomeIcon icon={faPencil} size="2xl"/>
                            </button>
                            <button 
                                className="text-gray-500 rounded-md mr-12 hover:scale-125"
                                onClick={closeEntry}
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} size="2xl"/>
                            </button> 
                        </div>
                    }
                </div>
                <div className="flex flex-col p-8">
                    <h2 className="text-2xl text-black font-bold mb-4">{entry.entryLabel}</h2>
                    <div className="flex flex-row justify-between">
                        <p className="my-2 py-2 italic w-[60%]">
                            "Every step you take in running is a stride towards greatness. Embrace the challenge, push through the pain, and let the rhythm of your feet carry you to your dreams."
                        </p>
                        {(entry.entryEffort == "Hard") &&
                            <p className="my-2 mx-4 py-4 px-4 bg-red-600 text-white">{entry.entryEffort} Intensity</p>
                        }
                        {(entry.entryEffort == "Good") && 
                            <p className="my-2 mx-4 py-4 px-4 bg-green-600 text-white">{entry.entryEffort} Intensity</p>
                        }
                        {(entry.entryEffort == "Light") && 
                            <p className="my-2 mx-4 py-4 px-4 bg-gray-600 text-white">{entry.entryEffort} Intensity</p>
                        }
                    </div>
                    <div className="flex flex-row justify-between mt-12">
                        <h3 className="text-xl text-gray-500 font-bold">Posts</h3>
                        <button 
                            className="bg-dark-green text-white p-2 mx-4 rounded-md h-1/2 hover:bg-yinmn-blue"
                            onClick={() => {setShowPostForm(true); setPostData({})}}
                        >
                            Add Post
                        </button>
                    </div>
                    {noPosts?
                    <p className="text-sm py-24">How did today go? Add a post and write about it!</p>
                    :
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
                    }
                </div>

                {showPostForm && 
                    <PostForm 
                        addPost={addPost} 
                        updatePost={updatePost}
                        deletePost={deletePost} 
                        setShowPostForm={setShowPostForm} 
                        entryId={entryId} 
                        postData={postData}
                        postCount={posts.length}
                    />
                }

                {showEntryForm &&
                    <EntryForm
                        entryIn={entry}
                        updateEntry={updateEntry}
                        setShowEntryForm={setShowEntryForm}
                        setShowEntryDeleteConfirm={setShowEntryDeleteConfirm}
                    />

                }

                {showEntryDeleteConfirm &&
                    <DeleteConfirm
                        deleteAction={deleteEntry}
                        setShowDeleteConfirm={setShowEntryDeleteConfirm}
                    />

                }
            </div>
        );

    }

}
