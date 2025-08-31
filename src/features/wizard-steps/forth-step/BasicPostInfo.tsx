"use client";

import { RequestFormData } from "@/types/types";
import { useBasicPostInfoForm } from "@/hooks/useBasicPostInfoForm";
import { useWordCountPoints } from "@/hooks/useWordCountPoints";


interface BasicPostInfoProps {
  initialData: RequestFormData;
  onChange: (data: RequestFormData) => void;
  onNext: () => void;
}

const BasicPostInfo = ({
  initialData,
  onChange,
  onNext
}: BasicPostInfoProps) => {

  const { values, errors, handleChange, validate } = useBasicPostInfoForm(initialData, onChange);
  const points = useWordCountPoints(values.postContent, 10);

  const handleNext = () => {
    if (validate()) onNext();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Post Help Request</h2>
        <p className="text-gray-600 mb-6">
          Share the post you need help with, and the community will provide feedback.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Post Link or Content */}
          <div className="mb-4">
            <label >
              Title:
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mb-2"
                placeholder="E.g., How to improve my post?"
                value={values.title}
                onChange={handleChange("title")}
                onBlur={validate}
                required
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">{errors.title}</p>
              )}
            </label>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post Content:
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              rows={5}
              value={values.postContent}
              onChange={handleChange("postContent")}
              onBlur={validate}
              placeholder="Paste your LinkedIn or Twitter Post here or write your draft directly"
              required
            />
            {errors.postContent && (
              <p className="text-sm text-red-600 mt-1">{errors.postContent}</p>
            )}
          </div>
          <div className="mt-3">
            Estimated Points: <span className="font-semibold">{points}</span>
          </div>
          <button
            type="submit"
            onClick={handleNext}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Next: Add Image
          </button>
        </form>
      </div>
    </div>
  );
}


export default BasicPostInfo
