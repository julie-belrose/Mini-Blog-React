export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
}

// Mock API functions - Replace with actual API calls

// Simulated database
let posts: Post[] = [
  {
    id: 1,
    title: 'First Post',
    body: 'This is the first blog post',
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'Second Post',
    body: 'This is the second blog post',
    author: 'Jane Smith',
  },
];

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...posts];
};

// Get a single post by ID
export const getPost = async (id: number): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const post = posts.find(p => p.id === id);
  if (!post) throw new Error('Post not found');
  return { ...post };
};

// Create a new post
export const createPost = async (postData: Omit<Post, 'id'>): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newPost: Post = {
    id: posts.length + 1,
    ...postData,
  };
  posts.push(newPost);
  return newPost;
};

// Update an existing post
export const updatePost = async (id: number, postData: Partial<Post>): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Post not found');
  
  posts[index] = { ...posts[index], ...postData };
  return { ...posts[index] };
};

// Delete a post
export const deletePost = async (id: number): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Post not found');
  
  const deletedPost = posts[index];
  posts = posts.filter(p => p.id !== id);
  return deletedPost;
};
