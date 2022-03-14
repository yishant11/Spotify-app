import React from 'react'
import styled from 'styled-components'
import { FaSpotify, FaEllipsisH } from 'react-icons/fa'
import { BiSearchAlt } from 'react-icons/bi'
const LeftMenu = () => {
    return (
        <Wrapper>
            <div className="logo-container">
                <i><FaSpotify /></i>
                <h2>Spotify</h2>
                <i>
                    <FaEllipsisH />
                </i>
            </div>
            <div className="search-box">
                <input type="text" placeholder='Search...' />
                <i>
                    <BiSearchAlt />
                </i>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 280px;
    height: 100%;
    min-height: 100vh;
    background: rgba(34,34,34,0.6);
    backdrop-filter: blur(10px);
    padding: 25px 30px;
    overflow: hidden;
    transition: all 0.3s ease;
    .logo-container {
        color: #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i {
            font-size: 30px;
        }
        i:nth-child(3) {
            font-size: 20px;
        }
        h2 {
            font-size: 20px;
        }
    }
    .search-box {
        width: 100%;
        height: 45px;
        /* background: coral; */
        position: relative;
        margin-top: 20px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
        input {
            width: 100%;
            height: 100%;
            padding-left: 45px;
            outline: none;
            border: none;
            background: rgba(0,0,0,0.5);
            color: #f1f1f1;
            font-size: 14px;
            font-weight: bold;
        }
        i {
            position: absolute;
            font-size: 20px;
            top: 0;
            left: 0;
            width: 45px;
            height: 45px;
            line-height: 45px;
            /* background: #555; */
            text-align: center;
            /* transform: translateY(50%); */
            color: #848484;
        }
    }

`


export default LeftMenu