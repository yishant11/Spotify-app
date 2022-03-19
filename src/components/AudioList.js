import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import songs from '../assets/songs'
import MusicPlayer from './MusicPlayer'
import SingleSong from './SingleSong'

const AudioList = () => {
    const [songsList, setSongsList] = useState(songs);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    //change currentSong
    const changeSong = (id) => {
        const newSong = songsList.find(item => item.id === id);
        setCurrentSong(newSong);
    }
    //change favourite
    const changeFavourite = (id) => {
        //find song by finding id of clicked item, and change favourite status of this song
        const newSongs = songsList.map(song => {
            if (song.id === id) {

                return { ...song, favourite: !song.favourite }
            }
            else {
                return song;
            }
        })
        setSongsList(newSongs);
    }



    return (
        <Wrapper>
            <h2 className='title'>
                The list <span>{songsList.length} songs</span>
            </h2>
            <div className="songs-container">
                {
                    songsList.map(item => {
                        return <SingleSong key={item.id} currentSong={currentSong} changeSong={changeSong} changeFavourite={changeFavourite} {...item} />
                    })
                }
            </div>
            <MusicPlayer changeFavourite={changeFavourite} currentSong={currentSong} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    padding: 10px 30px;
    .title {
        font-size: 18px;
        color: #f1f1f1;
        span {
            color: #848484;
            font-size: 12px;
        }
    }
    .songs-container {
        height: 220px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    
    @media screen and (max-width: 550px){
        .songs-container {
            height: 140px;
        }
    }
    
`

export default AudioList