'use client'

export default function Article() {

    return (
        <div>
            <h1 className="text-3xl font-bold ml-8 mt-4">Date</h1>
            <div className="flex p-8">
        
                <div className="flex-1">
                    <div className="mb-4 bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Mental Musings</h2>
                        <p>Card content goes here.</p>
                    </div>

                    <div className="mb-4 bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Physical Condition</h2>
                        <p>Card content goes here.</p>
                    </div>

                    <div className="mb-4 bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Environment</h2>
                        <p>Card content goes here.</p>
                    </div>
                    <button className="bg-pink-500 text-white px-4 py-2 mt-6 rounded-md">Add a writing category</button>
                </div>

            
                <div className="flex-1 ml-8">
                    <div className="bg-white p-8 rounded shadow">
                        <h2 className="text-2xl font-semibold mb-4">Mental Musings</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}