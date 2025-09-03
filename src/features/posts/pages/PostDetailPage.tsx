import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../services/postApi";
import type { Post } from "../services/postApi";

export default function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError("");

        fetchPostById(id as string)
            .then(({ data }) => {
                if (!mounted) return;
                setPost(data);
            })
            .catch(() => mounted && setError("Failed to load post"))
            .finally(() => mounted && setLoading(false));

        return () => {
            mounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="space-y-3">
                <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-2">
                <p className="text-red-600">{error}</p>
                <Link to="/" className="text-blue-600 underline">Back to posts</Link>
            </div>
        );
    }

    if (!post) return null;

    return (
      <article
          aria-labelledby={`post-${post.id}-title`}
          className="max-w-2xl space-y-3"
      >
          <Link to="/" className="text-blue-600 underline">Back to posts</Link>

          <h2 id={`post-${post.id}-title`} className="text-2xl font-semibold">
              {post.title}
          </h2>

          <p className="text-gray-700 whitespace-pre-line">{post.body}</p>

          <p className="text-sm text-gray-500">User #{post.userId}</p>
      </article>
  );
}

export { PostDetailPage };