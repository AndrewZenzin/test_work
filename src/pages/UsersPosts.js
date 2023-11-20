import React, {useState, useEffect} from 'react';
import {media} from "../assets/css/media";
import {Preloader} from "../components";
import {useParams} from "react-router-dom";

import styled from "styled-components";


const PostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 0 15px 15px 15px;
  flex-wrap: wrap;
  @media (max-width: ${media.tablet}) {
    padding: 0;
  }
`;

const PostWrapper = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 15px;
  background: #7788994f;
  border-radius: 10px;
  margin: 15px;

  @media (max-width: ${media.tablet}) {
    width: calc(100% - 60px);
    padding: 15px;
    margin: 0px 15px 15px 15px; 
    &:first-child{
      margin-top: 15px;
    }
  }
`;

const PostTitle = styled.div`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

const PostBody = styled.div`
  font-size: 14px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export function UsersPosts(test) {
    console.log(test);
    const {userId = "0"} = useParams();

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(response => response.json())
            .then(json => setPosts(json))
            .catch(error => console.error(error));
        setIsLoading(false);
    }, []);
    return (
        <PostsWrapper>
            {isLoading ? (
                <Preloader/>
            ) : (
                posts.map(post => (
                    <PostWrapper key={post.id}>
                        <PostTitle>
                            {post.title}
                        </PostTitle>
                        <PostBody>
                            {
                                post.body.substring(0, 80)
                            }
                            {post.body.length > 80 ? '...' : ''}
                        </PostBody>
                    </PostWrapper>)
                ))}
        </PostsWrapper>
    );

}

export default UsersPosts;
