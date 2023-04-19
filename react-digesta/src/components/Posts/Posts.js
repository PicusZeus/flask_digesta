import Post from "../Post/Post";
import NewPost from "../NewPost/NewPost";


const Posts = (props) => {
    const posts = props.posts
    console.log(posts)
    return (
        <>
            <div>POSTS</div>
            {posts.map(post => <Post key={post.id} post={post}/>)}
            <NewPost/>
        </>

    )
}

export default Posts