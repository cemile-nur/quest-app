import React from "react";
import Post from '../Post/Post';

function Home(){
    const [error,setError] = useState(null);
    const [isLoaded, setIsLoaded] =useState(false);
    const [postList, setPostList] = useState([]);

    useEffects(() => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) =>{
                setIsLoaded(true);
                setPostList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if(error){
        return <div> Error !!</div>;
    }else if(!isLoaded){
        return <div> loading...</div>;
    }else{
        return(

            <div className="container">
              home!!!
           
              {postList.map(post =>(
              <Post title={post.title} text={post.text}> </Post>
              ))}
          </div>
        );
    }


}

export default Home;