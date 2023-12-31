// HomepageContent.jsx
import React, { useState, useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import AlbumList from "./Album/AlbumList";
import AlbumSection from "./Album/AlbumSection";
import AlbumDetail from "./Album/AlbumDetail";
import getAlbumData from "../../FirebaseServices";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Config";
import SpotifyPlayer from "./Album/SpotifyPLayer";
import { useDisclosure } from "@chakra-ui/react";

const HomepageContent = ({ albums, setAlbums }) => {
  const toast = useToast();
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [playingSongInfo, setPlayingSongInfo] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentSongUrl, setCurrentSongUrl] = useState("");
  const { onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      const albumsData = await getAlbumData();
      setAlbums(albumsData);
    };
    fetchData();
  }, [setAlbums]);
  const handleSelectAlbum = (selectedAlbum) => {
    setSelectedAlbum(selectedAlbum);
    setPlayingSongInfo(null);
  };

  const handleCreateSong = (newSong) => {
    newSong.id = Date.now().toString();

    setSongs((prevSongs) => {

      console.log([...prevSongs, newSong]);
      return [...prevSongs, newSong]
    })

    onClose();

    toast({
      title: "Song Created",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 2000,
    });
  };

  const handleGoBack = () => {
    setSelectedAlbum(null);
  };

  const handleDeleteAlbum = async (albumId) => {
    const albumRef = doc(db, "albums", albumId);

    try {
      await deleteDoc(albumRef);

      setAlbums((prevAlbums) =>
        prevAlbums.filter((album) => album.id !== albumId)
      );

      toast({
        title: "Album Deleted",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });

      console.log("Album deleted successfully!");
    } catch (error) {
      console.error("Error deleting album:", error.message);
      toast({
        title: "Error",
        description:
          "An error occurred while deleting the album. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleTogglePlayPause = (songId, albumId) => {
    setPlayingSongInfo((prevPlayingSongInfo) => {
      if (
        prevPlayingSongInfo &&
        prevPlayingSongInfo.songId === songId &&
        prevPlayingSongInfo.albumId === albumId
      ) {
        return null;
      } else {
        return { songId, albumId };
      }
    });
  };

  return (
    <>
      <Box ml={10} mt={2} flex="1" mb="20vh">
        {selectedAlbum ? (
          <AlbumDetail
            currentSongUrl={currentSongUrl}
            setCurrentSongUrl={setCurrentSongUrl}
            album={selectedAlbum}
            handleCreateSong={handleCreateSong}
            onGoBack={handleGoBack}
            playingSongInfo={playingSongInfo}
            songs={songs}
            setSongs={setSongs}
            onTogglePlayPause={handleTogglePlayPause}
          />
        ) : (
          <AlbumSection>
            <AlbumList
              albums={albums}
              onSelectAlbum={handleSelectAlbum}
              onDeleteAlbum={handleDeleteAlbum}
            />
          </AlbumSection>
        )}
        {/* <Footer
          playingSongInfo={playingSongInfo}
          songs={songs}
          onTogglePlayPause={handleTogglePlayPause}
        /> */}
        {currentSongUrl && <SpotifyPlayer songUrl={currentSongUrl} />}
      </Box>
    </>
  );
};

export default HomepageContent;
