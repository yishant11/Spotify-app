import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaRegHeart, FaHeart, FaStepBackward, FaBackward, FaPlay, FaPause, FaForward, FaStepForward, FaShareAlt } from 'react-icons/fa'
import { BsDownload } from 'react-icons/bs'
const MusicPlayer = ({ currentSong, changeFavourite }) => {
    const { id, favourite, song, imgSrc, artist } = currentSong;
    const [isLoved, setisLoved] = useState(favourite);
    //state for playing
    const [isPlaying, setIsPlaying] = useState(false);
    //state for duration
    const [duration, setDuration] = useState(0);
    //state for current playing time of song
    const [currentTime, setCurrentTime] = useState(0);
    //state for loading
    const [isLoading, setIsLoading] = useState(false);
    //ref for audio player tag
    const audioPlayer = useRef();
    //ref for progress bar
    const progressBar = useRef();
    //animation ref
    const animationRef = useRef();
    const changeLoved = () => {
        setisLoved(!isLoved)
    }

    //Play/pause functionality
    const changePlayState = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current)
        }
    }
    //CHange Progress bar during audio play
    //here we just changing value of our progressbar value by assing it to current time of song in audioplayer
    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changeCurrentTime();
        //needs to run more than once
        animationRef.current = requestAnimationFrame(whilePlaying)
    }
    //set current time to progressbar value thats how we will update state and trigger rerender
    const changeCurrentTime = () => {
        // progressBar.current.style.setProperty(
        //     '--played-width',
        //     `${(progressBar.current.value / duration) * 100}%`);
        setCurrentTime(progressBar.current.value);
    }
    //
    const changeProgress = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changeCurrentTime();
    }

    //useEffect for audio player
    //we need to execute useeffect each time when audioplayer is loaded and we changing currentSong
    //and in ready state, !!! use optional chaining so we wont get an error
    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        // set max prop with out seconds in input[range]
        progressBar.current.max = seconds;
    }, [currentSong, audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    //useEffect for disabling play state if song ends
    useEffect(() => {
        if (currentTime >= duration) {
            setIsPlaying(false);
        }
    }, [currentTime])

    //function helper to calculate duration
    const CalculateTime = (num) => {
        const minutes = Math.floor(num / 60);
        // < 10 -> 09 or 11, 12 etc.
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(num % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${returnMin}:${returnSec}`

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
                    <div className="current-time">{CalculateTime(currentTime)}</div>
                    <input
                        onChange={changeProgress}
                        ref={progressBar}
                        className='progress-bar'
                        type="range"
                        defaultValue="0"
                    />
                    <div className="duration">
                        {/* check duration so we wont have NaN displayed in duration */}
                        {(duration && !isNaN(duration) ? CalculateTime(duration) : '00:00')}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.section`
    width: 100%;
    padding: 10px;
    padding-top: 20px;
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
            padding-bottom: 10px;
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
            input[type='range'] {
                overflow: hidden;
                width: 70%;
                -webkit-appearance: none;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                outline: none;
                border-radius: 10px;
                cursor: pointer;
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
    // Chrome & Safari
        input[type='range']::-webkit-slider-runnable-track {
            /* width: var(--played-width); */
            height: 10px;
            border-radius: 10px;
            background: #848484;
        }
        
        input[type='range']::-webkit-slider-thumb {
            width: 10px;
            -webkit-appearance: none;
            /* height: 100%; */
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: none;
            margin: -2px 0 0 0;
            background: #f1f1f1;
            border-radius: 5px;
            transition: all 250ms linear;
            box-sizing: border-box;
            box-shadow: -1080px 0 0 1080px #49e12e;
            cursor: pointer;
        }
    }
    
    .bottom {
        /** FF*/
        input[type="range"]::-moz-range-progress {
            background-color: #49e12e; 
        }
        input[type="range"]::-moz-range-track {  
            background-color: #848484;
        }
        /* IE*/
        input[type="range"]::-ms-fill-lower {
            background-color: #49e12e; 
        }
        input[type="range"]::-ms-fill-upper {  
            background-color: #848484;
        }
    }
   
   

`
export default MusicPlayer