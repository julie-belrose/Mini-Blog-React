import axios from "axios";

export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000, // 10 seconds of timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchPosts = () => api.get("/posts");
export const fetchPostById = (id: number) => api.get(`/posts/${id}`);
export const createPost = (data: any) => api.post("/posts", data); //TODO add good type