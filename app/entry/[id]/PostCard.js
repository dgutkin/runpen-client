'use client'

function PostCard({data, setShowPostForm, setPostData}) {

    const PREVIEW_CHAR_LENGTH = 50;

    return (
        <div className="mb-4 mx-1 bg-white p-4 rounded-md shadow border w-[24%] h-36 hover:animate-wiggle">
            <button className="h-full w-full flex flex-col" onClick={() => {setShowPostForm(true); setPostData(data)}}>
                <h2 className="text-lg font-semibold mb-2">{data.postTitle}</h2>
                <p className="text-start text-wrap">
                    {data.postText.slice(0, PREVIEW_CHAR_LENGTH)}{data.postText.length > PREVIEW_CHAR_LENGTH? "..." : ""}
                </p>
            </button>
        </div>
    );

}

export default PostCard;
