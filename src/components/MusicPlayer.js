import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRegHeart, FaHeart, FaStepBackward, FaBackward, FaPlay, FaPause } from 'react-icons/fa'
import { BsDownload } from 'react-icons/bs'
const MusicPlayer = ({ currentSong, changeFavourite }) => {
    const { id, favourite, song, imgSrc } = currentSong;
    const [isLoved, setisLoved] = useState(favourite);
    //state for playing
    const [isPlaying, setIsPlaying] = useState(false);
    const changeLoved = () => {
        setisLoved(!isLoved)
    }
    return (
        <Wrapper>
            <div className="song-image"></div>
            <div className="song-attributes">
                <audio
                    src=""
                    preload='metadata'
                />
                <div className="top">
                    <div className="left">
                        <div className="favourited" onClick={() => {
                            changeLoved()
                        }}>
                            {isLoved ? <i><FaHeart /></i> : <i><FaRegHeart /></i>}
                        </div>
                        <div className="download">
                            <i><BsDownload /></i>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="back">
                            <i><FaStepBackward /></i>
                            <i><FaBackward /></i>
                        </div>
                        <div className="playPause" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <i><FaPause /></i> : <i><FaPlay /></i>}
                        </div>
                        <div className="forward"></div>
                    </div>
                    <div className="right"></div>
                </div>
                <div className="bottom"></div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.section`


`
export default MusicPlayer