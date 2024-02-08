import { ChangeEvent, useState } from "react";
import logo from "./assets/logo-nlw.svg";
import { NewNoteCard } from "./components/NewNoteCard";
import { NoteCard } from "./components/NoteCard";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  function onNoteDeleted() {
    const notesArray = notes.filter((note) => note.id !== note.id);
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
  }

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img
        src={logo}
        alt='NLW Expert logo'
      />
      <form className='w-full'>
        <input
          type='text'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
          placeholder='Busque em suas notas...'
          onChange={handleSearch}
        />
      </form>
      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard
            note={note}
            key={note.id}
            onNoteDeleted={onNoteDeleted}
          />
        ))}
      </div>
    </div>
  );
}
