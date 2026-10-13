import "./App.css";
import { Header } from "./components/header";
import { PostList } from "./components/postList";
import { posts } from "./data/posts";

function App() {
    return (
        <div className="app">
            <Header title="Назва форуму" description="Короткий опис форуму"/>
            <PostList posts={posts}/>
        </div>
    )
}


export default App