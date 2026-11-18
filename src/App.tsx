import "./App.css";
import { Header } from "./components/header";
import { PostList } from "./components/postList";
import { useGetPostsQuery } from "./api/baseApi";
import { RegisterForm } from "./components/registerForm";
import { LoginForm } from "./components/loginForm";


function App() {
    const { data: posts, isLoading, isError } = useGetPostsQuery()

    return (
        <div className="app">
            <Header title="Назва форуму" description="Короткий опис форуму"/>

            <div className="auth">
                <RegisterForm/>
                <LoginForm/>
            </div>

            {isLoading && <p className="status">Завантаження постів</p>}
            {isError && <p className="status status-error">Не вдалося завантажити постии</p>}
            {posts && posts.length === 0 && <p className="status">Постів поки немає</p>}
            {posts && posts.length > 0 && <PostList posts={posts}/>}
        </div>
    )
}


export default App