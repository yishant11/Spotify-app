import React from 'react'

import styled from 'styled-components'
import songs from '../assets/songs'
import SingleSong from './SingleSong'

const AudioList = () => {
    return (
        <Wrapper>
            <h2 className='title'>
                The list <span>{songs.length} songs</span>
            </h2>
            <div className="songs-container">
                {
                    songs.map(item => {
                        return <SingleSong {...item} />
                    })
                }
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
    
    
`

export default AudioList