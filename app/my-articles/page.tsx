"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, Plus, Save, X, Upload, Copy, Check } from "lucide-react";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const articleSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
});

type Article = z.infer<typeof articleSchema>;

export default function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Partial<Article>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const savedArticles = localStorage.getItem("articles");
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem("articles", JSON.stringify(newArticles));
  };

  const handleSave = () => {
    if (!currentArticle) return;

    try {
      const validatedArticle = articleSchema.parse(currentArticle);
      if (isEditing) {
        const updatedArticles = articles.map((article) =>
          article.id === validatedArticle.id ? validatedArticle : article,
        );
        saveArticles(updatedArticles);
      } else {
        saveArticles([...articles, validatedArticle]);
      }
      setCurrentArticle(null);
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as Partial<Article>);
      }
    }
  };

  const handleEdit = (article: Article) => {
    setCurrentArticle(article);
    setIsEditing(true);
    setErrors({});
  };

  const handleDelete = (id: string) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    saveArticles(updatedArticles);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentArticle) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentArticle({
          ...currentArticle,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <div
            key={lastIndex}
            dangerouslySetInnerHTML={{
              __html: content.slice(lastIndex, match.index),
            }}
          />,
        );
      }
      const language = match[1] || "text";
      const code = match[2].trim();
      parts.push(
        <div key={match.index} className="relative my-4">
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{ padding: "1rem", borderRadius: "0.375rem" }}
          >
            {code}
          </SyntaxHighlighter>
          <button
            onClick={() => handleCopyCode(code)}
            className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors duration-200"
          >
            {copiedCode === code ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>,
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(
        <div
          key={lastIndex}
          dangerouslySetInnerHTML={{ __html: content.slice(lastIndex) }}
        />,
      );
    }

    return parts;
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
      ["code-block"],
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Article Manager</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentArticle({
              id: Date.now().toString(),
              title: "",
              content: "",
              image: "",
            });
            setIsEditing(false);
          }}
          className="mb-8 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          New Article
        </motion.button>

        <AnimatePresence mode="wait">
          {currentArticle && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-6 rounded-lg shadow-md mb-8"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {isEditing ? "Edit Article" : "New Article"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={currentArticle.title}
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        title: e.target.value,
                      })
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                      errors.title ? "border-red-500" : ""
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={currentArticle.content}
                    onChange={(content) =>
                      setCurrentArticle({ ...currentArticle, content })
                    }
                    modules={modules}
                    className={`mt-1 block w-full ${errors.content ? "border-red-500" : ""}`}
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.content}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="mt-1 flex items-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Upload
                        className="mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Upload Image
                    </button>
                    {currentArticle.image && (
                      <img
                        src={currentArticle.image}
                        alt="Preview"
                        className="ml-4 h-16 w-16 object-cover rounded-md"
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentArticle(null);
                      setErrors({});
                    }}
                    className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Save
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          <AnimatePresence>
            {articles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <div className="prose max-w-none">
                  {renderContent(article.content)}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(article)}
                    className="p-2 text-blue-500 hover:text-blue-600 transition duration-300"
                  >
                    <Edit size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(article.id)}
                    className="p-2 text-red-500 hover:text-red-600 transition duration-300"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
