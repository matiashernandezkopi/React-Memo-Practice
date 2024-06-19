import React, { useState } from "react";
import { useColour } from "../hooks/useColors";
import { ExpansibleNote } from "./expansibleNote";

interface ColumnProp {
  column: Note[];
  id: number;
  onDelete: (index: number) => void;
  onAddNote: (columnId: number, { title, text }: { title: string; text: string }) => void;
  onEditNote: (columnId: number, noteIndex: number, updatedNote: Note) => void;
  onDeleteNote: (columnId: number, noteIndex: number) => void;
}

export const Column: React.FC<ColumnProp> = ({ column, onDelete, id, onAddNote, onEditNote, onDeleteNote }) => {
  const { color, Container } = useColour();
  const [columnTitle, setColumnTitle] = useState("Titulo");
  const [opened, setMenu] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
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
        {column.map((note, index) => (
          <ExpansibleNote
            key={index}
            note={note}
            onEdit={(updatedNote) => onEditNote(id, index, updatedNote)}
            onDelete={() => onDeleteNote(id, index)}
          />
        ))}
        <AddForm id={id} onAddNote={onAddNote} />
      </div>
    </div>
  );
};





interface AddFormProp {
  onAddNote: (columnId: number, { title, text }: { title: string; text: string }) => void;
  id: number;
}

const AddForm: React.FC<AddFormProp> = ({ onAddNote, id }) => {
  const [add, setAdd] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", text: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNote.title && newNote.text) {
      onAddNote(id, newNote);
      setNewNote({ title: "", text: "" });
      setAdd(false);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewNote(prevNote => ({ ...prevNote, [name]: value }));
  };

  return (
    <>
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
        <button onClick={() => setAdd(true)} className="bg-slate-500 hover:bg-slate-400 rounded-xl px-2 py-1 select-none">
          Add+
        </button>
      )}
    </>
  );
};