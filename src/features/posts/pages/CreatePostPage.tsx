import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PostFormValues } from "../components/PostForm";
import { PostForm } from "../components/PostForm";
import { createPost } from "../services/postApi";

function CreatePostPage() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const handleCreate = async (values: PostFormValues) => {
        const res = await createPost(values);
        setServerError("");
        try {
            if (res.status === 201 && res.data?.id) {
                console.log("✅ Post created successfully:", res.data);
                await createPost(values);
                navigate("/");
            }
        } catch (e: any) {
            setServerError(e?.message ?? "Server error.");
            throw e;
        }
    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>
            {serverError && <p className="text-red-600 mb-3">{serverError}</p>}
            <PostForm onSubmit={handleCreate} submitLabel="Create" />
        </>
    );
}

export { CreatePostPage };
