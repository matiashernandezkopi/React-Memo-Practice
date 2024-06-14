import React, { useState } from "react"


interface ExpansibleNoteProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export const ExpansibleNote: React.FC<ExpansibleNoteProps> = ({ note, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-xl bg-slate-500 flex flex-col items-center hover:bg-slate-400 w-full">
      <div onClick={() => setExpanded(!expanded)} className="flex justify-between px-2 w-full cursor-pointer">
        <div>{note.title}</div>
        <div className="select-none">{expanded ? "-" : "+"}</div>
      </div>
      {expanded && (
        <>
          <div className="w-4/5 h-0.5 bg-black"></div>
          <p>{note.text}</p>
          <div className="flex gap-2">
            <button onClick={onEdit} className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500">Edit</button>
            <button onClick={onDelete} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};