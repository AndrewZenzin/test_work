import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import {Preloader} from "../components/Preloader";

import {media} from "../assets/css/media";

import styled from "styled-components";

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px;
  flex-wrap: wrap;
`;

const AlbumWrapper = styled.div`
  background: lightslategray;
  display: flex;
  width: 200px;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  border-radius: 10px;
  @media (max-width: ${media.tablet}) {
    width: 100%;
    margin: 0 0 15px 0;
  }
`;

const AlbumTitle = styled.div`
  font-size: 18px;
  color: lightgray;
  text-align: center;
`;

const AlbumLink = styled(Link)`
  text-decoration: none;
  @media (max-width: ${media.tablet}) {
    width: 100%;
  }
`;

export function UsersAlbums() {
    const {userId = "0"} = useParams();

    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
            .then(response => response.json())
            .then(json => setAlbums(json))
            .catch(error => console.error(error))
        setIsLoading(false);
    }, []);

    return (
        <PostsWrapper>
            {isLoading ? (
                <Preloader/>
            ) : (
                albums.map(album => (
                    <AlbumLink to={`/albums/${album.id}`} key={album.id}>
                        <AlbumWrapper>
                            <AlbumTitle>
                                {album.title}
                            </AlbumTitle>
                        </AlbumWrapper>
                    </AlbumLink>)
                ))}
        </PostsWrapper>
    );

}

export default UsersAlbums;
