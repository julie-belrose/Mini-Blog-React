import { PostsPage } from '../features/posts/pages/PostsPage';
import { PostDetailPage } from '../features/posts/pages/PostDetailPage';
import { CreatePostPage } from '../features/posts/pages/CreatePostPage';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../shared/components/Layout';

const NoMatch = () => <p>Error 404. Page Not Found</p>

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<PostsPage />} />
                <Route path="post/:id" element={<PostDetailPage />} />
                <Route path="create" element={<CreatePostPage />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
  }

export { AppRouter };