import { Link } from "react-router-dom";

interface PostCardProps {
    id: number | string;
    title: string;
    body: string;
}

const truncate = (text: string, max: number) => {
    return text.length <= max ? text : text.slice(0, max).trimEnd() + "…";
};

export function PostCard({ id, title, body }: PostCardProps) {

    return (
        <article className="rounded-xl border border-gray-200 p-4 bg-white hover:-translate-y-0.5 hover:shadow-lg transition"
            role="article" aria-labelledby={`post-${id}-title`}>
            <Link to={`/post/${id}`} className="block no-underline text-inherit">
                <h3 id={`post-${id}-title`} className="text-lg font-semibold leading-snug">{title}</h3>
                <p id={`post-${id}-body`} className="text-gray-700">{truncate(body, 140)}</p>
            </Link>
        </article>
    );
}
