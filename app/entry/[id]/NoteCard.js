'use client'

function NoteCard({data, setShowNoteForm, setNoteData}) {

    const PREVIEW_CHAR_LENGTH = 50;

    return (
        <div className="mb-4 mx-1 bg-white p-4 rounded-md shadow border w-64 h-64 hover:animate-wiggle">
            <button className="h-full w-full flex flex-col" onClick={() => {setShowNoteForm(true); setNoteData(data)}}>
                <h2 className="text-lg font-semibold mb-2 text-start">{data.noteTitle}</h2>
                <p className="text-start text-wrap">
                    {data.noteText.slice(0, PREVIEW_CHAR_LENGTH)}{data.noteText.length > PREVIEW_CHAR_LENGTH? "..." : ""}
                </p>
            </button>
        </div>
    );

}

export default NoteCard;
