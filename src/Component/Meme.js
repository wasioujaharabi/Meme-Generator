import React from "react"
import {useEffect } from "react";
import image from "../images/blob-960-960-0-0-fill.jpg"

export default function Meme(){
    
    const [formData, setformData]=React.useState({
        "topText" : "",
        "bottomText": "",
        "imgLink": image
    })
    const [Memes, setAllMemes] = React.useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * Memes.length)
        const randomUrl= Memes[randomNumber]["url"]
        setformData(prevformData=> {
            return{
                ...prevformData,
                imgLink : randomUrl
            }
        })
    }

    function handleChanger(event){
        const {name, value} = event.target
        setformData(prevformData=>{
            return{
                ...prevformData,
                [name]: value
            }
        })    
    }
    
    
    
    return(
        <main>
            <br/>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChanger}
                    name="topText"
                    value={formData.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChanger}
                    name="bottomText"
                    value={formData.bottomText}
                />
                <button 
                    className="form--button"
                    onClick = {getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={formData.imgLink} className="meme--image" alt="" />
                <h2 className="meme--text top">{formData.topText}</h2>
                <h2 className="meme--text bottom">{formData.bottomText}</h2>
            </div>
        </main>
    )
}