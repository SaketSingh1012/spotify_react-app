import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Flex,
  Text,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AddSongForm from "./AddSongForm";
import getSongData from "../../../getSongs";
// import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Config"; // Import your Firebase configuration

const AlbumDetail = ({
  currentSongUrl,
  setCurrentSongUrl,
  album,
  onGoBack,
  playingSongInfo,
  songs,
  setSongs,
  onTogglePlayPause,
}) => {
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const albumSongs = await getSongData(album.id);
        setSongs(albumSongs);
      } catch (error) {
        console.error("Error fetching songs:", error.message);
      }
    };

    fetchSongs();
  }, [album.id, setSongs]);

  const handleAddSong = () => {
    setShowAddSongForm(true);
  };

  const handleDeleteSong = async (songId) => {
    const songRef = doc(db, "songs", songId);

    try {
      await deleteDoc(songRef);

      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));

      toast({
        title: "Song Deleted",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });

      console.log("Song deleted successfully!");
    } catch (error) {
      console.error("Error deleting song:", error.message);
      toast({
        title: "Error",
        description:
          "An error occurred while deleting the song. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box height="auto" width="95vw" mt="15vh">
        <IconButton
          icon={<ArrowBackIcon />}
          borderRadius="15px"
          aria-label="Go Back"
          onClick={onGoBack}
          ml={-7}
          position="left"
        />
        <Text
          fontSize="24px"
          fontWeight="bold"
          textAlign="center"
          fontFamily="monospace"
          color="white"
          textShadow="3px 3px #000000d0"
          mt={-19}
          mb={4}
        >
          {album.title}
        </Text>

        <Box
          src={album.coverImage}
          alt={album.title}
          mx="auto"
          my={4}
          style={{
            backgroundImage: `url(${album.coverImage})`,
            borderRadius: "50px",
            width: "300px",
            height: "300px",
            position: "inherit",
            imageRendering: "auto",
            backgroundPosition: "top",
            backgroundSize: "cover",
          }}
        />
        <Button
          mt={9}
          mx="auto"
          fontSize="16px"
          mb={2}
          width="100px"
          ml="45%"
          borderRadius="20px"
          onClick={handleAddSong}
          color="white"
          variant="ghost"
          background="linear-gradient(to bottom, rgb(17, 191, 75), #00000047 )"
          boxShadow="0px 3px 10px 5px rgba(0, 2, 1, 0.439)"
          textShadow="1px 1px #121212d0"
          _hover={{
            background:
              "linear-gradient(to bottom, rgb(98, 219, 110), #06060680 )",
          }}
        >
          Add Song
        </Button>

        <Grid
          ml={12}
          templateColumns="repeat(4, 1fr)"
          gap={12}
          mt={10}
          justifyContent="space-between"
        >
          {songs.map((song) => (
            <Flex flexDirection="column">
              <Box>
                <Text fontFamily="sans-serif" color="white">
                  {song.title}
                </Text>
              </Box>
              <Box width="100%" key={song.id}>
                <Box
                  borderRadius="15px"
                  width="100px"
                  height="100px"
                  src={song.coverImage}
                  alt={song.title}
                  style={{
                    backgroundImage: `url(${song.coverImage})`,
                    width: "150px",
                    height: "150px",
                    position: "inherit",
                    imageRendering: "auto",
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    setCurrentSongUrl(song.mp3URL);
                    onTogglePlayPause(song.id, album.id);
                  }}
                />
                {/* <Box mt={2} ml={2}>
                    <IconButton
                      bgColor="#2bc848"
                      borderRadius="30px"
                      color="black"
                      mr={4}
                      ml={10}
                      _hover={{
                        background:
                          "linear-gradient(to right, rgb(143, 255, 184), #33ff0080 )",
                      }}
                      icon={
                        playingSongInfo &&
                        playingSongInfo.songId === song.id &&
                        playingSongInfo.albumId === album.id ? (
                          <BsFillPauseFill />
                        ) : (
                          <BsFillPlayFill />
                        )
                      }
                      aria-label={
                        playingSongInfo &&
                        playingSongInfo.songId === song.id &&
                        playingSongInfo.albumId === album.id
                          ? "Pause"
                          : "Play"
                      }
                      variant="ghost"
                      colorScheme="teal"
                      size="md"
                    />
                  </Box> */}

                <Box mt="12px">
                  <IconButton
                    icon={<MdDelete />}
                    borderRadius="30px"
                    ml={12}
                    bgColor="#00000080"
                    color="red"
                    size="sm"
                    aria-label="Delete Song"
                    _hover={{
                      background:
                        "linear-gradient(to bottom, rgb(6, 6, 6), #06060680 )",
                      boxShadow: "0px 3px 5px 5px rgba(0, 2, 1, 0.8)",
                    }}
                    onClick={() => handleDeleteSong(song.id)}
                  ></IconButton>
                </Box>
              </Box>
            </Flex>
          ))}
        </Grid>
        {showAddSongForm && (
          <AddSongForm
            albumId={album.id}
            onCreateSong={(newSong) => {
              setSongs((prevSongs) => [...prevSongs, newSong]);
            }}
            onClose={() => setShowAddSongForm(false)}
          />
        )}
      </Box>
    </>
  );
};

export default AlbumDetail;
