import { Dispatch, SetStateAction, useState } from "react";
import { useColour } from "../hooks/useColors";
import { ExpansibleNote } from "./expansibleNote";

interface ColumnProp {
  column: Note[];
  id: number;
  onDelete: (index: number) => void;
}

export const Column: React.FC<ColumnProp> = ({ column, onDelete, id }) => {
  const { color, Container } = useColour();
  const [columnTitle, setColumnTitle] = useState("Titulo");
  const [opened, setMenu] = useState(false);
  const [notes, setNotes] = useState<Note[]>(column); // Initialize with the passed column
  
  
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
  };

  

  const [editNote, setEditNote] = useState({ title: "", text: "" });

  const deleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const startEditNote = (index: number) => {
    setEditingNoteIndex(index);
    setEditNote({ title: notes[index].title, text: notes[index].text });
  };

  return (
    <div className="bg-slate-800 border-4 p-3 border-slate-900 rounded-xl h-4/5 w-64">
      
      <div className="flex justify-center items-center gap-1">
        <input
          type="text"
          value={columnTitle}
          onChange={handleTitleChange}
          maxLength={18}
          className={`text-2xl ${color} bg-transparent border-none outline-none text-right w-auto`}
          style={{ width: `${(columnTitle.length * 12) + 3}px` }}
        />
        <button onClick={() => setMenu(!opened)} className="h-6 rounded bg-slate-400 hover:text-black hover:bg-slate-50 px-1">
          <span className="relative bottom-2 text-2xl">{opened ? "-" : "+"}</span>
        </button>
        <button onClick={() => onDelete(id)} className="h-6 rounded bg-red-500 hover:bg-red-600 px-1">
          <span className="text-2xl relative bottom-2">x</span>
        </button>
      </div>


      {opened && <Container />}
      
      
      <div className="flex flex-col py-2 gap-1">
        
        
        {notes.map((note, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <ExpansibleNote 
              note={note} 
              onEdit={() => startEditNote(index)}
              onDelete={() => deleteNote(index)} 
            />
          </div>
        ))}



        <AddForm setNotes={setNotes} notes={notes} />


        {editingNoteIndex !== null && (
          <EditNoteForm  setNotes={setNotes} notes={notes} editingNoteIndex={editingNoteIndex} editNote={editNote} setEditNote={setEditNote} setEditingNoteIndex={setEditingNoteIndex} />
        )}



      </div>
    </div>
  );
};






const EditNoteForm=({setNotes,notes,editingNoteIndex,editNote,setEditNote,setEditingNoteIndex}:
    {setNotes:Dispatch<SetStateAction<Note[]>>,notes:Note[],editingNoteIndex:number|null,editNote: { title: string; text: string; },
    setEditNote: Dispatch<SetStateAction<{title: string;text: string;}>>,setEditingNoteIndex: Dispatch<SetStateAction<number | null>>}
  )=>{



  

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditNote(prevNote => ({ ...prevNote, [name]: value }));
  };

  

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingNoteIndex !== null && editNote.title && editNote.text) {
      const updatedNotes = [...notes];
      updatedNotes[editingNoteIndex] = { title: editNote.title, text: editNote.text };
      setNotes(updatedNotes);
      setEditingNoteIndex(null); // Hide the form after editing a note
    }
  };

  return(<form onSubmit={handleEditSubmit} className="flex flex-col items-center p-2 bg-slate-500 rounded-xl">
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={editNote.title}
      onChange={handleEditChange}
      className="mb-2 p-1 w-full"
    />
    <textarea
      name="text"
      placeholder="Text"
      value={editNote.text}
      onChange={handleEditChange}
      className="mb-2 p-1 w-full"
    />
    <div className="flex gap-2">
      <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500">Save</button>
      <button type="button" onClick={() => setEditingNoteIndex(null)} className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
    </div>
  </form>)
}




const AddForm=({setNotes,notes}:{setNotes:Dispatch<SetStateAction<Note[]>>,notes:Note[]})=>{
  
  const [add, setAdd] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", text: "" });




  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNote.title && newNote.text) {
      const newNoteObj: Note = { title: newNote.title, text: newNote.text };
      setNotes([...notes, newNoteObj]);
      setNewNote({ title: "", text: "" });
      setAdd(false); // Hide the form after adding a note
    }
  };

  
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewNote(prevNote => ({ ...prevNote, [name]: value }));
  };



  return (<>
    {add ? (
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-2 bg-slate-500 rounded-xl">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newNote.title}
          onChange={handleNoteChange}
          className="mb-2 p-1 w-full"
        />
        <textarea
          name="text"
          placeholder="Text"
          value={newNote.text}
          onChange={handleNoteChange}
          className="mb-2 p-1 w-full"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500">Add Note</button>
          <button type="button" onClick={() => setAdd(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
        </div>
      </form>
    ) : (
      <button onClick={() => setAdd(true)} className="bg-slate-500 hover:bg-slate-400 rounded-xl px-2 py-1">
        Add+
      </button>
    )}

  
  </>)
}