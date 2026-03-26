import { useState } from 'react';
import './App.css';

export const App = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [note, setNote] = useState([]); // Fix 1: Initialized as array

  const submitHandler = (e) => {
    e.preventDefault();

    // Logic: Create the new array by spreading existing notes and adding the new object
    const newNoteEntry = { title, details, id: Date.now() };
    setNote([...note, newNoteEntry]);

    alert('Note Added');
    setTitle('');
    setDetails('');
  };

  return (
    <div className="p-5 h-screen">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        <div className="lg:w-2/4 ">
          <form onSubmit={submitHandler} className="flex flex-col items-center gap-4 w-full">
            <h4 className="text-3xl text-center font-bold mb-2 text-white">Add Your Notes</h4>
            <input
              className="border-2 py-4 px-4 rounded w-full outline-0"
              type="text"
              placeholder="Enter Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="border-2 py-4 px-4 rounded w-full outline-0"
              placeholder="Enter Your Notes"
              rows="10"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            ></textarea>
            <button className="bg-blue-500 text-white p-2 rounded w-1/2 active:bg-blue-900">
              Add Note
            </button>
          </form>
        </div>

        <div className="lg:w-2/4 text-black rounded-2xl h-full">
          <h4 className="text-3xl text-center font-bold mb-2 text-white">Recent Notes</h4>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-0 md:justify-around w-full h-full">
            {/* Fix 2: Properly mapping through the notes array */}
            {note.map((item, index) => (
              <div key={item.id || index} className="bg-white p-4 rounded shadow mb-2 w-full">
                <h5 className="font-bold">{item.title}</h5>
                <p>{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
