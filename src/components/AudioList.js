import React from 'react'
import { FaHeadphones, FaHeart, FaRegClock, FaRegHeart } from 'react-icons/fa'
import styled from 'styled-components'

const AudioList = () => {
    return (
        <Wrapper>
            <h2 className='title'>
                The list <span>12 songs</span>
            </h2>
            <div className="songs-container">
                <div className="songs">
                    <div className="count">#01</div>
                    <div className="song">
                        <div className="img-container">
                            <img src="" alt="" />
                        </div>
                        <div className="song-info">
                            <p className="song-name">
                                Take me on
                                <span className=''>Artist name</span>
                            </p>
                            <div className="hits">
                                <p className="hit">
                                    <i><FaHeadphones /></i>
                                    95,490,102
                                </p>
                                <p className="duration">
                                    <i><FaRegClock /></i>
                                    03.04
                                </p>
                                <div className="favourite">
                                    <i><FaHeart /></i>
                                    <i><FaRegHeart /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    .songs {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: #848484;
        width: 100%;
        margin: 10px 0;
        padding: 5px;
        /* padding-bottom: ; */
        .count {
            margin-right: 10px;
        }
        .song {
            display: flex;
            align-items: center;
            width: 100%;
            border-bottom: 1px solid rgba(255, 255, 255 , 0.1);
            padding-bottom: 6px;
            .img-container {
                width: 45px;
                height: 45px;
                min-width: 45px;
                border-radius: 0.5em;
                background: #555;
                margin-right: 10px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .song-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                .song-name {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 18px;
                    width: 50%;
                }
                .hits {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    /* width: 60px; */
                    p {
                        display: flex;
                        margin-right: 10px;
                    }
                    i {
                        font-size: 12px;
                        margin-right: 6px;
                        display: grid;
                        place-items: center;
                    }
                    .favourite {
                        display: flex;
                        i {
                            color: #49e12e;
                            filter: drop-shadow(0px 0px 4px #49e12e);
                        }

                    }
                }
            }
        }
    }
    .songs:hover, .songs.active {
        color: #f1f1f1;
        transition: 0.3s;
    }
    
`

export default AudioList