import { useEffect, useState } from "react";

interface InitialData {
  title: string;
  content: string;
  image: File | null;
}

const BasicPostInfo = ({
    initialData, 
    onChange, 
    onNext
  }: {
    initialData: InitialData;
    onChange: (data: InitialData) => void;
    onNext: () => void;
    }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [points, setPoints] = useState(0);


  useEffect(() => {
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    setPoints(Math.floor(wordCount / 10));
  }, [content]);

  // Whenever title/content changes, inform parent
  useEffect(() => {
    onChange({ ...initialData, title, content });
  }, [title, content]);
  
  const handleNextClick = () => {
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Post Help Request</h2>
        <p className="text-gray-600 mb-6">
          Share the post you need help with, and the community will provide feedback.
        </p>
        
        <form>
          {/* Post Link or Content */}
          <div className="mb-4">
            <label >
              Title:
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mb-2"
                placeholder="E.g., How to improve my post?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
            </label>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post Content:
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the link to your post or describe the post here..."
              required
            />
          </div>
          <div className="mt-3">
            Estimated Points: <span className="font-semibold">{points}</span>
          </div>
          <button
            type="submit"
            onClick={handleNextClick}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}


export default BasicPostInfo
