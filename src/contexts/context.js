import React, { useContext, useState, useRef, useEffect } from "react";
import songs from '../assets/songs'
const AppContext = React.createContext();


const AppProvider = ({ children }) => {
    //song list
    const [songsList, setSongsList] = useState(songs);
    //state for index of current song
    const [indexOfSong, setIndexOfSong] = useState(0);
    //current active song
    const [currentSong, setCurrentSong] = useState(songsList[indexOfSong]);

    //change currentSong
    const changeSong = (id) => {
        const newSong = songsList.find(item => item.id === id);
        setCurrentSong(newSong);
        setIndexOfSong(id);
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
    //ref for audio volume input
    const audioVolume = useRef();

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

    // CHange Volume
    const changeVolume = () => {

        //get audioVolume refference and delete it by 100 so we get values like 0.1 0.2 1 etc
        const convertedVolume = audioVolume.current.value / 100;

        audioPlayer.current.volume = convertedVolume;

    }
    // MUSIC PLAYER BUTTONS FUNCTIONALITY
    const nextSong = () => {
        console.log('next');
        setIndexOfSong(oldIndex => {
            if (oldIndex >= songsList.length) {
                return 1
            } else {
                return oldIndex + 1;
            }
        })

        if (indexOfSong !== songsList.length) {
            setCurrentSong(songsList[indexOfSong])
        }
    }
    const previousSong = () => {
        console.log('prev')
        setIndexOfSong(oldIndex => {
            if (oldIndex <= 1) {
                return 0;
            }
            else {
                return oldIndex - 1;
            }
        })
        setCurrentSong(songsList[indexOfSong])
        // if (indexOfSong !== 0) {
        //     setCurrentSong(songsList[indexOfSong])
        // }
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

    //function helper to calculate duration
    const CalculateTime = (num) => {
        const minutes = Math.floor(num / 60);
        // < 10 -> 09 or 11, 12 etc.
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(num % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${returnMin}:${returnSec}`

    }

    // AUTO PLAY FUNCTIONALITY
    //if song current time reached its duration increase value of song index and set new song with this index
    useEffect(() => {
        if (currentTime >= duration) {
            setIndexOfSong((oldIndex) => {
                //check our boundaries so we wont go past our max of songs
                if (oldIndex >= songsList.length - 1) {
                    return 0
                } else {
                    return oldIndex + 1;
                }
            })
            //dont setup new song if reached end of playlist or it will cause an error
            if (indexOfSong !== songsList.length) {
                setCurrentSong(songsList[indexOfSong])
            }
        }
        // eslint-disable-next-line
    }, [currentTime])

    //every time index changes automatically switch to next song and play it
    //dont start to play it on page load hence why indexOfSong !== 0 and dont play just on click on songs, thats why we should be in playing state
    useEffect(() => {
        if (isPlaying) {
            audioPlayer.current.pause();
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        // eslint-disable-next-line
    }, [indexOfSong, audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])



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
        CalculateTime,
        audioVolume,
        changeVolume,
        nextSong,
        previousSong,

    }}>
        {children}
    </AppContext.Provider>
}

//global hook
const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }