'use client'

const Loading = () => {

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"/>

            <div className="bg-[#fdfdfd] p-8 z-10 rounded-md border">
                <p className="text-md text-gray-900">Loading...</p>
            </div>
        </div>
    );

}

export default Loading;
