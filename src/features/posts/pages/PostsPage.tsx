import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postApi";
import { PostCard } from "../components/PostCard";
import type { Post } from "../services/postApi";

function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const LIMIT_POSTS = 10;
    const COUNT_COLUMNS = 2;
    const COUNT_POSTS_PER_COLUMN = Math.floor(LIMIT_POSTS / COUNT_COLUMNS);
    const errorText = 'Aucun post pour l’instant';

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchPosts()
            .then(({ data }) => {
                if (!mounted) return;
                setPosts(data.slice(0, LIMIT_POSTS));
            })
            .catch(() => mounted && setError("Failed to load posts"))
            .finally(() => mounted && setLoading(false));

        return () => { mounted = false; };
    }, []);


    if (loading) {
        return (
            <div className={`grid gap-4 md:grid-cols-${COUNT_COLUMNS}`}>
                {Array.from({ length: COUNT_POSTS_PER_COLUMN }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-4">
                        <div className="animate-pulse space-y-3">
                            <div className="h-5 bg-gray-200 rounded w-2/3" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) return <p className="text-red-600">{error}</p>;
    if (!posts.length) return <p>{errorText}</p>;

    return (
        <>
            <h2 className="text-xl font-semibold mb-3">Posts</h2>
            <div className={`grid gap-4 md:grid-cols-${COUNT_COLUMNS}`}>
                {Array.from({ length: COUNT_POSTS_PER_COLUMN }).map((_, i) => (
                    posts.slice(i * COUNT_POSTS_PER_COLUMN, (i + 1) * COUNT_POSTS_PER_COLUMN).map((p) => (
                        <PostCard
                            key={p.id}
                            id={p.id!}
                            title={p.title}
                            body={p.body}
                        />
                    ))
                ))}
            </div>
        </>
    );
}

export { PostsPage };
