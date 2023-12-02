import React from "react";

const SpotifyPlayer = ({ songUrl }) => {
  return (
    <div style={{ position: "fixed", bottom: "20px", justifyContent:"center", left : "5%" }}>
      <iframe
        title="Spotify Player"
        style={{ borderRadius: "10px" }}
        src={songUrl}
        width="1150"
        height="80"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
