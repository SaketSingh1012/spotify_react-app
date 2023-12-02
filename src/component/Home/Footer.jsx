// Footer.jsx
import React, { useState, useEffect } from "react";
import { Box, Text, Flex, IconButton, Progress } from "@chakra-ui/react";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsSkipStartFill,
  BsSkipEndFill,
  BsSuitHeart,
  BsSuitHeartFill
} from "react-icons/bs";

const Footer = ({ playingSongInfo, songs, onTogglePlayPause }) => {
  const [isHeartFilled, setHeartFilled] = useState(false);

  const toggleHeart = () => {
    setHeartFilled((prevValue) => !prevValue);
  };
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const updateCurrentSong = () => {
      if (playingSongInfo) {
        const song = songs.find(
          (s) =>
            s.id === playingSongInfo.songId &&
            s.albumId === playingSongInfo.albumId
        );
        setCurrentSong(song);
      }
    };

    updateCurrentSong();
  }, [playingSongInfo, songs]);

  return (
    <Box
      borderRadius="20px"
      m="2.5%"
      width="95%"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      p={4}
      bg="#000000"
      color="white"
      borderTop="1px solid #333"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex alignItems="center" width="100%" height="10vh">
        <Flex width="30%">
          {currentSong && currentSong.title && currentSong.coverImage && (
            <>
              <Box
                width="50px"
                height="50px"
                borderRadius="10px"
                src={currentSong.coverImage}
                alt={currentSong.title}
                style={{
                  backgroundImage: `url(${currentSong.coverImage})`,
                  width: "50px",
                  height: "50px",
                  position: "inherit",
                  imageRendering: "auto",
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  marginLeft: "10px",
                }}
              />
              <Text
                color="white"
                ml={6}
                mr={2}
                alignSelf="center"
                fontFamily="sans-serif"
              >
                {currentSong.title}
              </Text>
            </>
          )}
        </Flex>

        <Flex width="50%" flexDirection="column">
          <Flex width="100%" justifyContent="center" mb={1}>
            <IconButton
              icon={<BsSkipStartFill />}
              color="white"
              bgColor="#242323"
              fontSize="lg"
              _hover={{
                background:
                  "linear-gradient(to bottom, rgb(71, 71, 71), #06060680 )",
                boxShadow: "0px 3px 5px 5px rgba(0, 0, 0, 0.8)",
              }}
              mr={3}
              aria-label="Previous Track"
              onClick={() => console.log("Previous Track")}
            />
            <Box mr={4}>
              <IconButton
                bgColor="#ffffff"
                borderRadius="40px"
                color="black"
                icon={
                  playingSongInfo ? <BsFillPauseFill /> : <BsFillPlayFill />
                }
                fontSize="lg"
                colorScheme={playingSongInfo ? "black" : "black"}
                aria-label={playingSongInfo ? "Pause" : "Play"}
                onClick={() => onTogglePlayPause(playingSongInfo)}
              />
            </Box>
            <IconButton
              ml={3}
              icon={<BsSkipEndFill />}
              fontSize="lg"
              color="white"
              bgColor="#242323"
              aria-label="Next Track"
              _hover={{
                background:
                  "linear-gradient(to bottom, rgb(71, 71, 71), #06060680 )",
                boxShadow: "0px 3px 5px 5px rgba(0, 0, 0, 0.8)",
              }}
              onClick={() => console.log("Next Track")}
              mr={2}
            />
          </Flex>

          <Box width="100%">
            <Progress
              value={50}
              borderRadius="md"
              colorScheme="teal"
              // visibility={playingSongInfo ? "visible" : "hidden"}
            />
          </Box>
        </Flex>
        <Box width="15%" fontSize="25px" ml="10px" p={5} align="center">
      {isHeartFilled ? (
        <BsSuitHeartFill color="red" onClick={toggleHeart} />
      ) : (
        <BsSuitHeart  onClick={toggleHeart} ></BsSuitHeart>
      )}
    </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
