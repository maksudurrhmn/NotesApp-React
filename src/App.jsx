import { useState, useEffect, useRef } from 'react';
import './App.css';
import { X, Pencil } from 'lucide-react';

const App = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [note, setNote] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const isFirstLoad = useRef(true);

  // ✅ Load notes from localStorage on first render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNote(savedNotes);
    }
  }, []);

  // ✅ Save notes to localStorage whenever note changes
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem('notes', JSON.stringify(note));
  }, [note]);

  const submitHandler = (e) => {
    e.preventDefault();

    const newNote = [...note];

    if (editIndex !== null) {
      newNote[editIndex] = { title, details };
      setEditIndex(null);
      alert('Note Updated');
    } else {
      newNote.push({ title, details });
      alert('Note Added');
    }

    setNote(newNote);
    setTitle('');
    setDetails('');
  };

  const deleteNote = (idx) => {
    const newNote = [...note];
    newNote.splice(idx, 1);
    setNote(newNote);
    alert('Note Deleted');
  };

  const editNote = (idx) => {
    setTitle(note[idx].title);
    setDetails(note[idx].details);
    setEditIndex(idx);
  };

  return (
    <div className="p-5 h-screen">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* Form Section */}
        <div className="lg:w-2/4">
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
            />

            <button className="bg-blue-500 text-white p-2 rounded w-1/2 active:bg-blue-900">
              {editIndex !== null ? 'Update Note' : 'Add Note'}
            </button>
          </form>
        </div>

        {/* Notes Section */}
        <div className="lg:w-2/4 text-black rounded-2xl h-full">
          <h4 className="text-3xl text-center font-bold mb-2 text-white">Recent Notes</h4>

          <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-0 md:justify-around w-full h-full bg-gray-700 overflow-auto rounded p-4">
            {note.map((e, idx) => {
              return (
                <div
                  key={idx}
                  className="relative bg-yellow-100 text-black md:w-[45%] h-2/4 rounded-2xl p-4 md:mb-4"
                >
                  <h4 className="font-bold text-2xl text-center mb-2 pb-2 border-b-2 border-black uppercase">
                    {e.title}
                  </h4>

                  <p className="text-black text-lg">{e.details}</p>

                  {/* Delete */}
                  <button
                    className="bg-red-500 p-2 rounded-full absolute top-2 right-2 active:bg-red-900"
                    onClick={() => deleteNote(idx)}
                  >
                    <X />
                  </button>

                  {/* Index */}
                  <p className="absolute top-2 left-2 rounded-full bg-black text-white p-2 font-bold">
                    {idx + 1}
                  </p>

                  {/* Edit */}
                  <button
                    className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full active:bg-blue-900 text-white"
                    onClick={() => editNote(idx)}
                  >
                    <Pencil />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
