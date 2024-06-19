import React, { useState } from "react"


interface ExpansibleNoteProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: () => void;
}

export const ExpansibleNote: React.FC<ExpansibleNoteProps> = ({ note, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedNote(prevNote => ({ ...prevNote, [name]: value }));
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(editedNote);
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl bg-slate-500 flex flex-col items-center hover:bg-slate-400">
      {isEditing ? (
            <form onSubmit={handleEditSubmit} className="flex flex-col items-center p-2 bg-slate-500 rounded-xl w-full">
              <input
                type="text"
                name="title"
                value={editedNote.title}
                onChange={handleEditChange}
                className="mb-2 p-1 w-full"
              />
              <textarea
                name="text"
                value={editedNote.text}
                onChange={handleEditChange}
                className="mb-2 p-1 w-full"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
              </div>
            </form>
          ) :
          (<>
          
          <div onClick={() => setExpanded(!expanded)} className="flex justify-between px-2 w-full cursor-pointer">
            <div>{note.title}</div>
            <div className="select-none">{expanded ? "-" : "+"}</div>
            
          </div>
          
          
          
          
          {expanded && (
              <>
                <div className="w-4/5 h-0.5 bg-black"></div>
                
                  <div>
                    <p>{note.text}</p>
                    <button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
                    <button onClick={onDelete} className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded ml-2">Delete</button>
                  </div>
                
              </>
            )}
          </>
          
        )}




    </div>
  );
};