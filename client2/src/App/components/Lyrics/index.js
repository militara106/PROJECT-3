import React, { Component } from 'react';
const genius = require("genius-lyrics");
const Genius = new genius.Client('H73AWVbAuOyEwi6Xz-zEaCEKlTXVIME-VXtaa0ZiCAFX-CEAhmvWcmaepu0zsBnm');

export default class Lyrics extends Component {
    state = {
        lyrics: ""
    }
    
    componentDidMount(){
        var lyrics = this.newLyric();
        console.log(lyrics);
    }

    async newLyric() {
        const search = await Genius.findTrack('vete bad bunny');
        const url = await Genius.getUrl(search, 1);
        const lyricsJSON = await Genius.getLyrics(url);
        const lyrics = lyricsJSON.lyrics;
        return lyrics;
    }

    render(){
        return (
            <div>

            </div>
        );
    };
}