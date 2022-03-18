import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRegHeart, FaHeart, FaStepBackward, FaBackward, FaPlay, FaPause, FaForward, FaStepForward, FaShareAlt } from 'react-icons/fa'
import { BsDownload } from 'react-icons/bs'
const MusicPlayer = ({ currentSong, changeFavourite }) => {
    const { id, favourite, song, imgSrc, artist } = currentSong;
    const [isLoved, setisLoved] = useState(favourite);
    //state for playing
    const [isPlaying, setIsPlaying] = useState(false);
    const changeLoved = () => {
        setisLoved(!isLoved)
    }
    return (
        <Wrapper>
            <div className="song-image">
                <img src={imgSrc} alt={artist} />
            </div>
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
                        <div className="forward">
                            <i><FaForward /></i>
                            <i><FaStepForward /></i>
                        </div>
                    </div>
                    <div className="right">
                        <i><FaShareAlt /></i>
                    </div>
                </div>
                <div className="bottom"></div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.section`
    width: 100%;
    padding: 10px;
    display: flex;
    .song-image {
        width: 120px;
        min-width: 120px;
        height: 80px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .song-attributes {
        width: 100%;
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .top, .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .left, .right, .middle {
                color: #595959;
                font-size: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                i {
                    margin: 0px 15px;
                    font-size: 18px;
                }
            }
        }
        .favourited i {
            color: #49e12e !important;
            filter: drop-shadow(0px 0px 20px #49e12e)
        }
        .top {
            .middle {
                .back i:nth-child(2), .forward i:nth-child(1) {
                    color: #9a9a9a !important;
                }
            }
            .playPause {
                width: 30px;
                height: 30px;
                min-width: 30px;
                border-radius: 100%;
                background: #f1f1f1;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #000;
            }
        }
    }

`
export default MusicPlayer