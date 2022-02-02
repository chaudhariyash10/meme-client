import React,{useState} from 'react'
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappIcon, WhatsappShareButton, TelegramShareButton, TelegramIcon} from "react-share";
import { saveAs } from "file-saver";
import axios from 'axios';

function SocialMedia({ memeurl }) {
    const download = () => {
        saveAs(memeurl, "meme.jpg")
    }
    let [saved, setSaved] = useState(false);
    const saveMeme = () => {
        const token = window.localStorage.getItem('token');
        let username = "";
        axios.post("http://localhost:5000/user", { token })
        .then((res) => {
            username = res.data.username;
            const data = { memeurl ,  username};
            axios.post("http://localhost:5000/savememe", data)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setSaved(true);
                    }
            })
        })
        
    }

    return (
      <div className="meme-container">
                <div className='share-buttons'>
                    <FacebookShareButton 
                    url={memeurl}
                    quote={"Meme created using react"}
                    hashtag="#newMemeApp">
                    <FacebookIcon size={65} />
                    </FacebookShareButton>
                    <TwitterShareButton 
                    url={memeurl}
                    quote={"Meme created using react"}
                    hashtag="#newMemeApp">
                    <TwitterIcon size={65} />
                    </TwitterShareButton>
                    <WhatsappShareButton 
                    url={memeurl}
                    quote={"Meme created using react"}
                    hashtag="#newMemeApp">
                    <WhatsappIcon size={65} />
                    </WhatsappShareButton>
                    <TelegramShareButton 
                    url={memeurl}
                    quote={"Meme created using react"}
                    hashtag="#newMemeApp">
                    <TelegramIcon size={65} />
                    </TelegramShareButton>
                    <button className='glow-on-hover' onClick={saveMeme}>{saved ? `Saved!` : 'Save Meme'}</button>
                    <button className='glow-on-hover' onClick={download}>Download Meme</button>
                </div>
                <img className="meme-image" alt="meme" src={memeurl}></img>
            </div>
    )
}

export default SocialMedia
