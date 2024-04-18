'use client'

import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TagCard({ data, updateTag, deleteTag }) {

    const [editMode, setEditMode] = useState(false);
    const [tagText, setTagText] = useState("");

    const MAX_TAG_LENGTH = 15;

    useEffect(() => {
        if (data) {
            setTagText(data.tagText);
        }
    }, []);

    function handleTagClick(e) {
        setEditMode(true);
    }

    function handleInput(e) {
        if (e.target.value.length > MAX_TAG_LENGTH){
            alert("Character limit reached!");
        } else {
            setTagText(e.target.value);
        }
    }

    function handleTagUpdate() {
        const updatedTag = {...data, tagText: tagText};
        updateTag(updatedTag);
        setEditMode(false);
    }

    function handleTagDelete() {
        setEditMode(false);
        deleteTag(data.tagId);
    }

    return (

        <div className="bg-green-100 p-2 rounded-md shadow">

            {editMode ?
            <div className="flex flex-row">
                <input 
                    className="bg-green-50 mr-1"
                    type="text"
                    name="tag"
                    value={tagText || ""}
                    onInput={handleInput}
                    onFocus={(e) => e.target.select()}
                />
                <button className="mx-2" onClick={handleTagUpdate}>
                    <FontAwesomeIcon icon={faCheck} size="lg"/>
                </button>
                <button className="mx-2" onClick={handleTagDelete}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
            :
            <button className="w-full justify-items-center" onClick={handleTagClick}>
                <p className="text-black">
                    {tagText}
                </p>
            </button>
            }

        </div>

    )

}

export default TagCard;
