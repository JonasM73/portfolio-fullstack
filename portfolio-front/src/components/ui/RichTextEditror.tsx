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
          "min-h-56 bg-transparent px-5 py-5 text-sm leading-7 text-zinc-800 outline-none placeholder:text-zinc-400 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_p]:mb-2",
      },
    },
  });

  if (!editor) return null;

  const buttonClass = (isActive = false) =>
    `group flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-zinc-900 text-white shadow-sm"
        : "text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm"
    }`;

  const separator = <div className="mx-1 h-6 w-px bg-zinc-200" />;

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 focus-within:border-teal-400 focus-within:shadow-lg focus-within:shadow-teal-500/10">
      <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200/80 bg-gradient-to-r from-zinc-50 to-white px-3 py-2">
        <button
          type="button"
          title="Annuler"
          className={buttonClass()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Rétablir"
          className={buttonClass()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </button>

        {separator}

        <button
          type="button"
          title="Gras"
          className={buttonClass(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Italique"
          className={buttonClass(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Souligné"
          className={buttonClass(editor.isActive("underline"))}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>

        {separator}

        <button
          type="button"
          title="Liste à puces"
          className={buttonClass(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Liste numérotée"
          className={buttonClass(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        {separator}

        <button
          type="button"
          title="Aligner à gauche"
          className={buttonClass(editor.isActive({ textAlign: "left" }))}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Centrer"
          className={buttonClass(editor.isActive({ textAlign: "center" }))}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </button>

        <button
          type="button"
          title="Aligner à droite"
          className={buttonClass(editor.isActive({ textAlign: "right" }))}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}