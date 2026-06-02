import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-48 rounded-b-2xl bg-white px-4 py-4 text-sm outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1",
      },
    },
  });

  if (!editor) return null;

  const btn =
    "flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900";

  const active = "bg-zinc-200 text-zinc-900";

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-teal-400">
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
        <button type="button" className={btn} onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </button>

        <button type="button" className={btn} onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </button>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        <button
          type="button"
          className={`${btn} ${editor.isActive("bold") ? active : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          className={`${btn} ${editor.isActive("italic") ? active : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          className={`${btn} ${editor.isActive("underline") ? active : ""}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        <button
          type="button"
          className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          className={`${btn} ${editor.isActive("orderedList") ? active : ""}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        <button type="button" className={btn} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="h-4 w-4" />
        </button>

        <button type="button" className={btn} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="h-4 w-4" />
        </button>

        <button type="button" className={btn} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="h-4 w-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}