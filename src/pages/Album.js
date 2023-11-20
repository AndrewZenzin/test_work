import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import {Preloader} from "../components/Preloader";

import {media} from "../assets/css/media";

import styled from "styled-components";

const PhotoWrapper = styled.div`
  text-align: center;
`;
const Photo = styled.img`
  padding-top: 10px;
  padding-left: 10px;
`;

const PhotoLink = styled(Link)`
  text-decoration: none;
  @media (max-width: ${media.tablet}) {
    width: 100%;
  }
`;

export function Album() {
    const {albumId = "0"} = useParams();
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
            .then(response => response.json())
            .then(json => setPhotos(json))
            .catch(error => console.error(error))
    }, []);

    useEffect(() => {
        if (!photos || (!photos.length)) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [photos]);

    return (
        <PhotoWrapper>
            {isLoading ? (
                <Preloader/>
            ) : (
                photos.map(photo => (
                    <PhotoLink to={photo.url} key={photo.id} target={"_blank"}>
                        <Photo src={photo.thumbnailUrl}/>
                    </PhotoLink>
                    )
                ))}
        </PhotoWrapper>
    );

}

export default Album;
