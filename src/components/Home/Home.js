import React, { useState,useEffects } from "react";
import Post from '../Post/Post';
import { makeStyles } from '@mui/material/styles';
import PostForm from "../Post/PostForm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f0f5ff'
    }
}));


function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPosts = () => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    useEffects(() => {
        refreshPosts()
    }, [postList])

    if (error) {
        return <div> Error !!</div>;
    } else if (!isLoaded) {
        return <div> loading...</div>;
    } else {
        return (
            <div className={classes.container}>
                <PostForm userId={1} userName={"ddd"}  refreshPosts={refreshPosts} />
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} 
                    title={post.title} text={post.text} > </Post>
                ))}
            </div>


        );
    }
}

export default Home;