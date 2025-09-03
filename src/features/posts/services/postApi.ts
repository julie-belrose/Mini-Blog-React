import axios from "axios";

export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000, // 10 seconds of timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

export type Post = {
    id?: number;
    userId: number;
    title: string;
    body: string;
};

export const fetchPosts = () => api.get<Post[]>("/posts");
export const fetchPostById = (id: number | string) => api.get<Post>(`/posts/${id}`);
export const createPost = (data: Post) => api.post<Post>("/posts", data);