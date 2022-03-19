import React, { useContext, useState } from "react";
import songs from '../assets/songs'
const AppContext = React.createContext();


const AppProvider = ({ children }) => {
    //song list
    const [songsList, setSongsList] = useState(songs);
    //current active song
    const [currentSong, setCurrentSong] = useState(songs[0]);
    //change currentSong
    const changeSong = (id) => {
        const newSong = songsList.find(item => item.id === id);
        setCurrentSong(newSong);
    }
    //change favourite state of song
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
    return <AppContext.Provider value={{
        songsList,
        currentSong,
        changeSong,
        changeFavourite
    }}>
        {children}
    </AppContext.Provider>
}

//global hook
const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }