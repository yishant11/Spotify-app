import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FaRegHeart, FaHeart, FaStepBackward, FaBackward, FaPlay, FaPause, FaForward, FaStepForward, FaShareAlt } from 'react-icons/fa'
import { BsDownload } from 'react-icons/bs'
const MusicPlayer = ({ currentSong, changeFavourite }) => {
    const { id, favourite, song, imgSrc, artist } = currentSong;
    const [isLoved, setisLoved] = useState(favourite);
    //state for playing
    const [isPlaying, setIsPlaying] = useState(false);
    //ref for audio player tag
    const audioPlayer = useRef();
    //ref for progress bar
    const progressBar = useRef();
    const changeLoved = () => {
        setisLoved(!isLoved)
    }

    //Play/pause functionality
    const changePlayState = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
    }
    return (
        <Wrapper>
            <div className="song-image">
                <img src={imgSrc} alt={artist} />
            </div>
            <div className="song-attributes">
                <audio
                    ref={audioPlayer}
                    src={song}
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
                        <div className="playPause" onClick={() => changePlayState()}>
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
                <div className="bottom">
                    <div className="current-time">00:00</div>
                    <input ref={progressBar} className='progress-bar' type="range" />
                    <div className="duration">00:24</div>
                </div>
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
        .bottom {
            margin-bottom: 20px;
            padding: 0 15px;
            .progress-bar {
                width: 70%;
                position: relative;
                height: 5px;
                outline: none;
                border: none;
                appearance: none;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.1);
            }
            .current-time, .duration {
                color: #f1f1f1;
                font-size: 14px;
                font-weight: bold;
            }
        }
    }

    /* Chrome & Safari */
    .bottom {
        .progress-bar::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            background: #848484;
            width: 50%;
            height: 100%;
            border-radius: 10px;
            z-index: 2;
            transition: all 0.3s ease;
        }
        .progress-bar::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: none;
            outline: none;
        }
    }
    /* Firefox */
    .bottom {
        .progress-bar::-moz-range-track {
            width: 78%;
            height: 5px;
            outline: none;
            border: none;
            appearance: none;
            border-radius: 10px;
            background: rgba(255,255,255,0.1);
            cursor: pointer
        }
        .progress-bar::-moz-range-progress {
            background: #848484;
            width: 50%;
            height: 100%;
            border-radius: 10px;
            z-index: 2;
            transition: all 0.3s ease;
        }
        .progress-bar::-moz-range-thumb {
            -webkit-appearance: none;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: none;
            outline: none;
        }
    }

`
export default MusicPlayer