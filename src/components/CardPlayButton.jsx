import React from 'react'
import {Pause, Play} from './Player'
import { usePlayerStore } from '@/store/playerStore'

export function CardPlayButton({ id }){
    const {
        currentMusic, 
        setCurrentMusic, 
        isPlaying, 
        setIsPlaying
    } = usePlayerStore(state => state)

    const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;
    
    const handleClick = () => {
        if(isPlayingPlaylist) {
            setIsPlaying(false);
            return;
        }

        fetch(`/api/get-info-playlist.json?id=${id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data;
                setIsPlaying(true);
                setCurrentMusic({
                    songs,
                    playlist,
                    song: songs[0],
                });
            })

        setCurrentMusic({
            playlist: {
                id
            },
        });

    }

    return (
        <div
        className={!isPlayingPlaylist ? `absolute right-4 bottom-20 translate-y-4
          transition-all duration-500 opacity-0 
          group-hover:translate-y-0 group-hover:opacity-100 
          z-10 `  
          : 
          `absolute right-4 bottom-20 translate-y-0
          transition-all duration-500 opacity-100  
          z-10 `}
      >
        <button onClick={handleClick} className='card-play-button rounded-full bg-green-500 p-4'>
        {isPlayingPlaylist ? <Pause/> : <Play/>}
        </button>

        </div>
    )
}
