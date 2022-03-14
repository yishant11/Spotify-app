import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
const MenuList = ({ title, objectList }) => {
    // console.log(title, objectList);
    //active link by default will be first
    const [active, setActive] = useState(objectList[0].name)
    //handle active link change
    const handleActive = (id) => {
        //find item by clicked id
        const clickedItem = objectList.find(item => item.id === id);
        //set active name to clicked item name
        setActive(clickedItem.name)
    }
    useEffect(() => {

    }, [])
    return (
        <Wrapper>
            <h2>{title}</h2>
            <ul>
                {objectList.map(item => {
                    const { id, icon, name } = item;
                    return (
                        // add active class if it have same name as in state
                        <li className={active === name ? 'active' : null} onClick={() => handleActive(id)} key={id}>
                            <a href="#">
                                <i>
                                    {icon}
                                </i>
                                <span>{name}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 15px 0;
    h2 {
        color: #848484;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    ul {
        width: 100%;
        padding: 0;
        list-style-type: none;
    }
    li {
        list-style: none;
        margin: 5px 0;
        width: 100%;
        padding: 5px 0;
        position: relative;
    }
    a {
        text-decoration: none;
        color: #848484;
        display: flex;
        align-items: center;
        font-size: 16px;
    }
    i {
        font-size: 18px;
        margin-right: 15px;
        
    }
    span {
        padding-bottom: 5px;
    }
    li:before {
        position: absolute;
        content: '';
        top: 0;
        left: -15px;
        width: 5px;
        height: 90%;
        background-color: #49e12e;
        border-radius: 5px;
        opacity: 0;
        visibility: hidden;
        /* transition: 0.3s; */
    }
    //hovering on link change color, aswell as change color if link is currently active
    li:hover a , li.active a{
        color: #f1f1f1;
        transition: 0.3s;
    }
    //show on hovering asweel if link is currently active
    li:hover:before, li.active:before {
        visibility: visible;
        opacity: 1;
        transition: 0.5s;
    }
    
`

export default MenuList