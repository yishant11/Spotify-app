import React from 'react'
import styled from 'styled-components'
import { BsFillVolumeUpFill, BsMusicNoteList } from 'react-icons/bs';
import { FaDesktop } from 'react-icons/fa'
import track from '../img/track.png'
const TrackList = () => {
    return (
        <Wrapper className='tracklist'>
            <div className="top">
                <img src={track} alt="track name" />
                <p>sample name <span>artist</span> </p>
            </div>
            <div className="bottom">
                <i><BsFillVolumeUpFill /></i>
                <input type="range" />
                <i><BsMusicNoteList /></i>
                <i><FaDesktop /></i>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    .top {
        display: flex;
        align-items: center;
        img {
            width: 50px !important;
        }
        p {
            margin-left: 10px;
            color: #f1f1f1;
            font-size: 14px;
            span {
                display: block;
                font-size: 12px;
                color: #848484;
            }
        }
    }
    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        color: #f1f1f1;
        i {
            font-size: 18px;
            color: #848484;
        }
        i:hover {  
                color: #f1f1f1;
                transition: 0.3s;
                cursor: pointer; 
        }
        input {
            position: relative;
            height: 5px;
            border: none;
            outline: none;
            border-radius: 5px;
            background: rgba(255,255,255,0.1);
            appearance: none;
        }
    }
    // Chrome & Safari
    .bottom input::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        background: #49e12e;
        width: 50%;
        height: 100%;
        border-radius: 10px;
        z-index: 2;
        transition: width 250ms linear;
    }
    .bottom input::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 10px;
        height: 20px;
        border-radius: 10px;
        background: #f1f1f1;
        border: 2px solid #000;
        cursor: pointer;
        position: relative;
        margin: -2px 0 0 0;
        z-index: 3;
        box-sizing: border-box;
        transition: all 250ms linear;
    }
    // firefox
    .bottom input::-moz-progress-bar {
        /* position: absolute;
        content: '';
        top: 0;
        left: 0; */
        background: #49e12e;
        width: 50%;
        height: 100%;
        border-radius: 10px;
        z-index: 2;
        transition: width 250ms linear;
    }
     .bottom input::-moz-range-thumb {
        -webkit-appearance: none;
        width: 10px;
        height: 20px;
        border-radius: 10px;
        background: #f1f1f1;
        border: 2px solid #000;
        cursor: pointer;
        position: relative;
        margin: -2px 0 0 0;
        z-index: 3;
        box-sizing: border-box;
        transition: all 250ms linear;
     }
     @media screen and (max-width: 550px) {
        display: none;
    }
`

export default TrackList