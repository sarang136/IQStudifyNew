"use client";
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import { useEffect } from 'react';
// import { Bold, Italic, Strikethrough, Underline as UnderlineIcon, List, ListOrdered, Heading1, Heading2, Link, Undo, Redo } from 'lucide-react';

// export default function TiptapEditor({ value, onChange }) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//     ],
//     content: value,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       if (html !== value) {
//         onChange(html);
//       }
//     },
//   });

//   useEffect(() => {
//     if (editor && value !== editor.getHTML()) {
//       editor.commands.setContent(value);
//     }
//   }, [value, editor]);

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className=" rounded-lg overflow-hidden">
//       <div className="flex flex-wrap gap-1 p-2 bg-[#072B78] border-b">
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           disabled={!editor.can().chain().focus().toggleBold().run()}
//           className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
//         >
//           <Bold className="w-4 h-4" />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           disabled={!editor.can().chain().focus().toggleItalic().run()}
//           className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
//         >
//           <Italic className="w-4 h-4" />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           disabled={!editor.can().chain().focus().toggleStrike().run()}
//           className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
//         >
//           <Strikethrough className="w-4 h-4" />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
//         >
//           <UnderlineIcon className="w-4 h-4" />
//         </button>
//         <div className="border-l border-gray-300 mx-1 h-6"></div>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//           className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
//         >
//           <Heading1 className="w-4 h-4" />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//           className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
//         >
//           <Heading2 className="w-4 h-4" />
//         </button>
//         <div className="border-l border-gray-300 mx-1 h-6"></div>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
//         >
//           <List className="w-4 h-4" />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={`p-2 text-white hover:bg-blue-900 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
//         >
//           <ListOrdered className="w-4 h-4" />
//         </button>
//         <div className="border-l border-gray-300 mx-1 h-6"></div>
//         <button
//           type="button"
//           onClick={() => {
//             const previousUrl = editor.getAttributes('link').href;
//             const url = window.prompt('URL', previousUrl);
//             if (url === null) return;
//             if (url === '') {
//               editor.chain().focus().extendMarkRange('link').unsetLink().run();
//               return;
//             }
//             editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
//           }}
//           className={`p-2 text-white hover:bg-blue-900 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
//         >
//           <Link className="w-4 h-4" />
//         </button>
//         <div className="border-l border-gray-300 mx-1 h-6"></div>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().undo().run()}
//           disabled={!editor.can().chain().focus().undo().run()}
//           className="p-2 rounded text-white hover:bg-blue-900"
//         >
//           <Undo className="w-4 h-4" />
//         </button>
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().redo().run()}
//           disabled={!editor.can().chain().focus().redo().run()}
//           className="p-2 text-white hover:bg-blue-900"
//         >
//           <Redo className="w-4 h-4" />
//         </button>
//       </div>
//       <EditorContent editor={editor} className="p-4 min-h-[200px] focus:outline-none" />
//     </div>
//   );
// }







import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Link,
  Undo,
  Redo,
  Image as ImageIcon,
} from "lucide-react";

export default function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
      }
    },
  });

  const imageInputRef = useRef();

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        editor.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) return null;

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-[#072B78] border-b">
        {/* Formatting Buttons */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive("strike") ? "bg-gray-200" : ""}`}
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <div className="border-l border-gray-300 mx-1 h-6"></div>

        {/* Heading Buttons */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="border-l border-gray-300 mx-1 h-6"></div>

        {/* List Buttons */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded text-white hover:bg-blue-900 ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 text-white hover:bg-blue-900 ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="border-l border-gray-300 mx-1 h-6"></div>

        {/* Link Button */}
        <button
          type="button"
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href;
            const url = window.prompt("URL", previousUrl);
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
          className={`p-2 text-white hover:bg-blue-900 ${editor.isActive("link") ? "bg-gray-200" : ""}`}
        >
          <Link className="w-4 h-4" />
        </button>

        {/* Image Upload Button */}
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="p-2 text-white hover:bg-blue-900"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageInputRef}
          className="hidden"
        />

        <div className="border-l border-gray-300 mx-1 h-6"></div>

        {/* Undo / Redo Buttons */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded text-white hover:bg-blue-900"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 text-white hover:bg-blue-900"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="p-4 min-h-[200px] max-w-[1000px] focus:outline-none" />
    </div>
  );
}
