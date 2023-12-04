import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Flex,
  Text,
  Button,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AddSongForm from "./AddSongForm";
import getSongData from "../../../getSongs";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Config";

const AlbumDetail = ({
  setCurrentSongUrl,
  album,
  onGoBack,
  songs,
  setSongs,
  onTogglePlayPause,
  handleCreateSong
}) => {
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

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
    if(!songId){
      console.log("songId not found");
      return;
    }
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
    onClose();
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
            <Flex flexDirection="column" key={song.id}>
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
                <Box mt="12px">
                  <Button
                    mt={3}
                    ml={2.5}
                    width="45%"
                    fontSize="12px"
                    variant="ghost"
                    fontFamily="sans-serif"
                    borderRadius="60px"
                    background="linear-gradient(to bottom, rgb(17, 191, 75), #00000047 )"
                    boxShadow="0px 3px 10px 5px rgba(0, 2, 1, 0.439)"
                    textShadow="1px 1px #121212d0"
                    color="white"
                    _hover={{
                      background:
                        "linear-gradient(to bottom, rgb(6, 6, 6), #06060680 )",
                      boxShadow: "0px 3px 10px 5px rgba(0, 2, 1, 0.8)",
                    }}
                    onClick={onOpen}
                  >
                    Delete Song
                  </Button>
                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent borderRadius="20px" bgColor="#1cb44a">
                        <AlertDialogHeader
                          color="#ffffff"
                          textShadow="1px 0px #393939d0"
                          fontFamily="sans-serif"
                          fontSize="lg"
                          mt={3}
                          fontWeight="bold"
                        >
                          Delete Song
                        </AlertDialogHeader>
                        <AlertDialogBody color="#323232">
                          Are you sure you want to delete the song?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <Button
                            p={3}
                            borderRadius="25px"
                            bgColor="black"
                            color="white"
                            mb={2}
                            _hover={{
                              background:
                                "linear-gradient(to bottom, rgb(6, 6, 6), #06060680 )",
                              boxShadow: "0px 2px 2px 2px rgba(0, 2, 1, 0.8)",
                            }}
                            ref={cancelRef}
                            onClick={onClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            p={3}
                            borderRadius="25px"
                            bgColor="red"
                            color="white"
                            mb={2}
                            _hover={{
                              background:
                                "linear-gradient(to bottom, rgb(6, 6, 6), #06060680 )",
                              boxShadow: "0px 2px 2px 2px rgba(0, 2, 1, 0.8)",
                            }}
                            onClick={() => handleDeleteSong(song.id)}
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </Box>
              </Box>
            </Flex>
          ))}
        </Grid>
        {showAddSongForm && (
          <AddSongForm
            albumId={album.id}
            onCreateSong={handleCreateSong}
            onClose={() => setShowAddSongForm(false)}
          />
        )}
      </Box>
    </>
  );
};

export default AlbumDetail;
