
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function PostForm({addPost, updatePost, deletePost, setShowPostForm, entryId, postData}) {

    const [postTitle, setPostTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const POST_TEXT_MAX_WORDS = 200;
    const POST_TITLE_MAX_CHARS = 30;

    useEffect(() => {
      
      if (postData) {
        setPostTitle(postData.postTitle);
        setPostText(postData.postText);
      }
      
    }, [])
  
    function submitPost({update}) {
      
      setErrorMessage("");
  
      if (!postTitle || !postText) {
        setErrorMessage("Post incomplete.");
        return;
      } else if (postTitle.length > POST_TITLE_MAX_CHARS) {
        setErrorMessage("Maximum character count exceeded.");
        return;
      } else if (postText.trim().split(/\s+/).length > POST_TEXT_MAX_WORDS) {
        setErrorMessage("Maximum word count exceeded.");
        return;
      } 
  
      const data = {
        postTitle: postTitle,
        postText: postText,
        postId: update? postData.postId : uuidv4(),
        entryId: entryId
      }

      setPostTitle("");
      setPostText("");
      console.log(update);
      console.log(data);
      if (update) {
        updatePost(data);
      } else {
        addPost(data);
      }
  
    }

    function cancelPost() {

      setPostTitle("");
      setPostText("");
      setShowPostForm(false);

    }

    function removePost() {

      if (postData.postId) {
        deletePost(postData.postId);
      }

    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white overflow-y-auto w-[70%] h-[60%] shadow-2xl border border-gray rounded-md p-4 m-10 z-10">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-semibold">Post</h2>
              <button className="bg-red-500 text-white p-2 rounded-md" onClick={removePost}>Delete</button>
            </div>
            <div className="my-6 mx-6">
                <input 
                    type="text" 
                    id="post-title" 
                    name="post-title" 
                    className="w-[40%] bg-white border text-black py-3 px-3 rounded-md focus:border-gray-500"
                    placeholder="Post title"
                    onInput={(e) => setPostTitle(e.target.value)}
                    value={postTitle || ""}
                />
                <p className="text-xs text-gray-200 my-1 mx-1">Character count limit is 30.</p>
            </div>
            <div className="my-6 mx-6">
                <textarea 
                    id="post" 
                    name="post" 
                    rows="7" 
                    className="w-full px-2 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-gray-500" 
                    placeholder="Start writing..."
                    onInput={(e) => setPostText(e.target.value)}
                    value={postText || ""}
                >
                </textarea>
                <p className="text-xs text-gray-200 mx-1">Word count limit is 200.</p>
            </div>
  
            <div className="flex flex-row my-3 mx-6">
                <button
                  className="bg-dark-green text-white w-[25%] px-4 py-2 mx-2 rounded-md hover:bg-yinmn-blue" 
                  type="button"
                  onClick={() => Object.keys(postData).length ? submitPost({update: true}) : submitPost({update: false})}
                >
                {Object.keys(postData).length ? "Update" : "Post"}
                </button>
                <button 
                  className="bg-dark-green text-white w-[25%] px-4 py-2 mx-2 rounded-md hover:bg-yinmn-blue" 
                  type="button"
                  onClick={cancelPost}
                >
                Cancel
                </button>
            </div>
            <p className="my-2 mx-6 text-sm text-red-600">{errorMessage}</p>
          </div>
        </div>
        
      </div>
    );
  
  }

export default PostForm;
