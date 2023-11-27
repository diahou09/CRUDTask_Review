import { NoteCard } from "@/components/NoteCard";
import { NoteInput } from "@/components/NoteInput";

async function getNotes() {
  const res = await fetch(
    "https://devscale-mockapi.fly.dev/api/collections/notes/records?filter=(user='me@diah.com')",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export default async function Page() {
  const { items } = await getNotes();
  console.log(items);

  return (
    // This will show in the website
    <div className="flex flex-col w-full mb-20">
      <NoteInput />
      <div className="space-y-3 w-full text-sm text-slate-600 ">
        {items.map(({ id, content }) => {
          return <NoteCard key={id} id={id} content={content} />;
        })}
      </div>
    </div>
  );
}
