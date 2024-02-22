
export default function Calendar() {

    const days = Array.from({ length: 30 }, (_, index) => index + 1);

    return (

        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Month Calendar</h1>
            <div className="grid grid-cols-7 gap-4">
                {days.map((day) => (
                <div key={day} className="p-4 border border-gray-300">
                    <p className="text-sm font-bold mb-2">{`Day ${day}`}</p>
                    <a
                    href="/article"
                    className="text-blue-500 hover:underline"
                    >
                    View Details
                    </a>
                </div>
                ))}
            </div>
        </div>


    );

}