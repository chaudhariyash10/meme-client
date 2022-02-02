import React, {useEffect, useState} from 'react'
import "./meme.styles.css"
import SocialMedia from './SocialMedia';

function Meme() {

    const [generated, setGenerate] = useState(false);

    const [memes, setMemes] = useState([{
                "id": "61579",
                "name": "One Does Not Simply",
                "url": "https://i.imgflip.com/1bij.jpg",
                "width": 568,
                "height": 335,
                "box_count": 2
            }]);
    const [curMemeIdx, setCurMemeIdx] = useState(0);
    const [curTextBox, setCurTextBox] = useState(2);
    const [captions, setCaptions] = useState(["", ""]);
    const [memeurl, setmemeurl] = useState("https://i.imgflip.com/1bij.jpg")
     useEffect(() => {
         fetch("https://api.imgflip.com/get_memes")
             .then(res => res.json())
             .then((res) => {
                 console.log(res)
                 setMemes(res.data.memes);
             })
             .catch(err => console.log(err));    
     }, []);
    
    const newMeme = () => {
        const length = memes.length;
        let newIdx = Math.floor(Math.max((Math.random() * length) - 1, 0));
        setCurMemeIdx(newIdx)
        setCurTextBox(memes[newIdx].box_count)
        setmemeurl(memes[newIdx].url)
        const newCaptions = [];

        for (let i = 0; i < curTextBox; i++)
            newCaptions.push("");
        
        setCaptions(newCaptions);
        setGenerate(false);
    }

    const generateMeme = () => {

        let formdata = new FormData();

        formdata.append('template_id', memes[curMemeIdx].id);
        formdata.append('username', 'YashChaudhari1');
        formdata.append('password', 'Meme@123');
        captions.map((caption, index) => formdata.append(`boxes[${index}][text]` ,caption))
        fetch("https://api.imgflip.com/caption_image", {
            method: "POST",
            body: formdata
        })
            .then(res => res.json())
            .then(res => {
                setmemeurl(res.data.url);
            })
    }

    const handleCaptions = (e, index) => {
        let newCaptions = []
        for (let i = 0; i < curTextBox; i++)
            if (i  === index)
                newCaptions.push(e.target.value)
            else
                newCaptions.push(captions[i]);

        setCaptions(newCaptions);

    }



    return (
        <div className='container'>
            <button className="glow-on-hover" onClick={newMeme}>Click me to get New Meme Template</button>  
            {!generated && <div className="meme-container">
                <div className="inputs">
                    {Array(curTextBox).fill(null).map(((value, index) => (
                        <div key={index}>
                            <label className="placeholder">{`Text for Box ${index + 1}`}</label>
                            <input onChange={(e) => handleCaptions(e, index)} className="input_box" type="text" placeholder="" />
                            <span className="focus-border"></span>
                        </div>
                    )))}
                    <button className="glow-on-hover" onClick={() => { generateMeme(); setGenerate(!generated) }}>Generate Meme</button>
                </div>
                <img className="meme-image" alt="meme" src={memeurl}></img>
            </div>}

            {generated && <SocialMedia  memeurl={memeurl} />}
        </div>
    )
}

export default Meme
