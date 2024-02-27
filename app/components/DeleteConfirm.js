'use client'

function DeleteConfirm({deleteAction, setShowDeleteConfirm}) {

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white z-10 rounded-md p-8 flex flex-col">
                <h3 className="my-3 text-lg font-bold">Delete</h3>
                <p className="mb-6">Are you sure? All contents will be deleted.</p>
                <div className="flex flex-row">
                    <button className="bg-dark-green text-white rounded-md p-1 mr-1 w-[20%]" onClick={deleteAction}>Yes</button>
                    <button className="bg-red-600 text-white rounded-md p-1 mx-1 w-[20%]" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );

}

export default DeleteConfirm;
