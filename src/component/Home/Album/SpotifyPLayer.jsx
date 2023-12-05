import React from "react";

const SpotifyPlayer = ({ songUrl }) => {
  console.log(songUrl);
  return (
    <div
      style={{
        position:"fixed",
        bottom:"40px",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        right:"0%"
       }}
      key={songUrl}
    >
      <audio style={{width:"90%"}} controls allow="autoplay"  loading="lazy">
        <source  src={songUrl} type="audio/mp3"></source>
      </audio>
    </div>
  );
};

export default SpotifyPlayer;
