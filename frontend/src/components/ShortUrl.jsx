import { useState } from "react";

export function ShortUrl(){
    //React-query -> you create the local state var here in this component

    const [link, setLink] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    return <div >
        <input id="link" style={{
            padding : 10,
            margin : 10,
        }} type="text" placeholder="paste your link here" onChange={function(e){
            const value = e.target.value;
            setLink(e.target.value);
        }} /><br />

        <button style={{
            padding : 10,
            margin : 10,
            backgroundColor : "red"
        }} onClick={
            ()=>{
                fetch("http://localhost:3000/shortUrl",{
                    method : "POST",
                    body : JSON.stringify({
                        mainUrl : link,
                    }),
                    headers : {
                        "Content-type" : "application/json"
                    }
                    
                })
                .then(async function(res){
                    const json = await res.json();
                    //alert("Your shotened URL is : " + json.url);
                    setShortUrl(json.url);
                })
            }
        }>Cut</button>
        <h3>{shortUrl}</h3>
    </div>
}
