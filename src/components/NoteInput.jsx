"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const NoteInput = () => {
  const router = useRouter();
  const [note, setNote] = useState("");

  // post data
  async function createNote() {
    const res = await fetch(
      " https://devscale-mockapi.fly.dev/api/collections/notes/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: note,
          user: "me@diah.com",
          additionalData: "",
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    router.refresh();
  }

  //save data
  return (
    <div className="pb-10">
      <h3 className="pb-2 pt-5 text-indigo-600">Add product review:</h3>
      <div className="flex justify-center w-full gap-4 m-auto">
        <textarea
          className="border resize-none w-full m-auto rounded-md p-2 text-sm "
          placeholder="Write something here ..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex flex-col justify-end ">
          <button
            className="rounded-md border px-8 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-400 transition "
            onClick={createNote}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
