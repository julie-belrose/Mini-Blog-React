import { useState } from "react";

export type PostFormValues = {
    title: string;
    body: string;
    userId: number;
};

type PostFormProps = {
    onSubmit: (values: PostFormValues) => Promise<void> | void;
    submitLabel?: string;
    disabled?: boolean;
};

export function PostForm({
    onSubmit,
    submitLabel = "Create",
    disabled = false,
}: PostFormProps) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState<number>(1);

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const preValidation = () => {
        setError("");
        if (!title.trim() || !body.trim()) {
            setError("Title and body are required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!preValidation()) return;

        try {
            setSubmitting(true);
            await onSubmit({
                title: title.trim(),
                body: body.trim(),
                userId,
            });
        } catch (err: unknown) {
            setError((err as Error | null)?.message ?? "Submit failed.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        id="title"
                        name="title"
                        className="mt-1 w-full rounded-lg border-gray-300 focus:border-black focus:ring-black px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={disabled || submitting}
                        placeholder="Post title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
                    <textarea
                        id="body"
                        name="body"
                        className="mt-1 w-full rounded-lg border-gray-300 focus:border-black focus:ring-black px-3 py-2 min-h-[140px]"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        disabled={disabled || submitting}
                        placeholder="Write something…"
                        required
                    />
                </div>

                <div className="max-w-[10rem]">
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User</label>
                    <input
                        id="userId"
                        name="userId"
                        type="number"
                        min={1}
                        className="mt-1 w-full rounded-lg border-gray-300 focus:border-black focus:ring-black px-3 py-2"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                        disabled={disabled || submitting}
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
                        disabled={disabled || submitting}
                    >
                        {submitting ? "Saving…" : submitLabel}
                    </button>
                    {submitting && <span className="text-sm text-gray-500">Submitting…</span>}
                </div>
            </div>
        </form>
    );
}