"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export interface ReviewComment {
  userId: string;
  userName: string;
  userImage: string;
  text: string;
  createdAt: string;
}

interface ReviewCommentsProps {
  applicationId: string;
  initialComments?: ReviewComment[];
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}hr ago`; // Updated to match "1hr ago" in Figma
  return `${days}d ago`;
}

export default function ReviewComments({
  applicationId,
  initialComments = [],
}: ReviewCommentsProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<ReviewComment[]>(initialComments);
  const [inputText, setInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const previousComments = [...comments];

    const optimisticComment: ReviewComment = {
      userId: session?.user?.email || "temp-id",
      userName: session?.user?.name || "You",
      userImage: session?.user?.image || "",
      text: inputText.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, optimisticComment]);
    setInputText("");

    try {
      const response = await fetch(
        `/api/admin/applications/${applicationId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: optimisticComment.text }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const updatedComments = await response.json();
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
      setComments(previousComments);
      setInputText(optimisticComment.text);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 border border-[#D1D1D1] bg-[#F5F4F4] rounded-xl p-5 flex flex-col">
      <h3 className="text-[15px] font-bold text-black mb-5">
        Comments and Review Notes
      </h3>

      {/* Comments List */}
      <div className="flex flex-col gap-5 mb-6">
        {comments.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="flex gap-4 items-start">
              {/* Avatar Circle */}
              {comment.userImage ? (
                <img
                  src={comment.userImage}
                  alt={comment.userName}
                  className="w-10 h-10 rounded-full bg-[#B0B8B9] object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#B0B8B9] flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-medium text-sm">
                    {comment.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Comment Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[14px] text-black tracking-tight">
                    {comment.userName}
                  </span>
                  <span className="text-[11px] font-medium text-gray-600">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-[12px] text-black mt-1 whitespace-pre-wrap leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Form - Required by ticket, fits below the list */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-auto">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your review note here..."
          disabled={isSubmitting}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50 min-h-[70px] resize-y bg-white"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!inputText.trim() || isSubmitting}
            className="px-5 py-2 bg-[#CB3A31] text-white text-sm font-semibold rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Add Note"}
          </button>
        </div>
      </form>
    </div>
  );
}
