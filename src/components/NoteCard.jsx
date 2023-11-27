"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash, Pencil, Save } from "lucide-react";

export const NoteCard = ({ id, content }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);

  //button Delete
  async function handleDelete() {
    await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  }

  //button Edit
  async function handleUpdate() {
    const res = await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: currentContent }),
      }
    );
    const data = await res.json();
    setOnEdit(false);
    router.refresh();
  }

  return (
    <div className="flex items-center p-5 gap-5 border-2 rounded-lg">
      {/* Condition to Edit content */}
      {onEdit ? (
        <textarea
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
          className="flex w-full resize-none border-2 text-sm text-indigo-400 rounded-lg"
        />
      ) : (
        <div className="flex flex-col w-full">{currentContent}</div>
      )}

      {/* Condition to Update - Edit */}
      {onEdit ? (
        // Update condition
        <button
          className="bg-emerald-200 py-2 px-5 rounded-lg hover:bg-emerald-100 "
          onClick={handleUpdate}
        >
          {/* Update */}
          <Save />
        </button>
      ) : (
        // Edit condition
        <button
          className="bg-yellow-300 py-2 px-5 rounded-lg hover:bg-yellow-200 "
          onClick={() => setOnEdit(true)}
        >
          {/* Edit */}
          <Pencil />
        </button>
      )}

      {/* Delete button */}
      <button
        className="bg-blue-200 py-2 px-5 rounded-lg hover:bg-blue-100 "
        onClick={handleDelete}
      >
        {/* Delete */}
        <Trash />
      </button>
    </div>
  );
};
