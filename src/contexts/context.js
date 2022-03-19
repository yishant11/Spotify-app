import React, { useContext, useState, useRef, useEffect } from "react";
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

    // MUSIC PLAYER

    //state for playing
    const [isPlaying, setIsPlaying] = useState(false);
    //state for duration
    const [duration, setDuration] = useState(0);
    //state for current playing time of song
    const [currentTime, setCurrentTime] = useState(0);

    //ref for audio player tag
    const audioPlayer = useRef();
    //ref for progress bar
    const progressBar = useRef();
    //animation ref
    const animationRef = useRef();

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

    //useEffect for disabling play state if song ends
    useEffect(() => {
        if (currentTime >= duration) {
            setIsPlaying(false);
        }
    }, [currentTime])

    //useEffect for audio player
    //we need to execute useeffect each time when audioplayer is loaded and we changing currentSong
    //and in ready state, !!! use optional chaining so we wont get an error
    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        // set max prop with out seconds in input[range]
        progressBar.current.max = seconds;
    }, [currentSong, audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    //function helper to calculate duration
    const CalculateTime = (num) => {
        const minutes = Math.floor(num / 60);
        // < 10 -> 09 or 11, 12 etc.
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(num % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${returnMin}:${returnSec}`

    }



    return <AppContext.Provider value={{
        songsList,
        currentSong,
        changeSong,
        changeFavourite,
        setCurrentSong,
        isPlaying,
        duration,
        currentTime,
        audioPlayer,
        progressBar,
        animationRef,
        changePlayState,
        changeProgress,
        setDuration,
        CalculateTime
    }}>
        {children}
    </AppContext.Provider>
}

//global hook
const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }