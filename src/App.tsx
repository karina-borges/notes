import logo from "./assets/logo-nlw.svg";
import { NewNoteCard } from "./components/NewNoteCard";
import { NoteCard } from "./components/NoteCard";

const note = {
  date: new Date(),
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus pariatur animi vel illum est odio delectus quia, quibusdam accusantium eaque velit tempore sed excepturi molestiae dicta. Omnis alias animi pariatur?",
};

export function App() {
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img
        src={logo}
        alt='NLW Expert logo'
      />
      <form className='w-full'>
        <input
          type='text'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
          placeholder='Busque em suas notas...'
        />
      </form>
      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard />

        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />
      </div>
    </div>
  );
}
