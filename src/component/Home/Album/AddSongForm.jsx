// AddSongForm.jsx
import { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { db, addDoc, collection } from "../../../Config";

const AddSongForm = ({ albumId, onCreateSong, onClose }) => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [mp3URL, setMP3URL] = useState("");


  const isValidUrl = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };

  const handleSaveSong = () => {
    if (!title || !coverImage || !mp3URL) {
      setValidationError("Please fill in both title and cover image URL.");
      return;
    }

    if (!isValidUrl(coverImage)) {
      setValidationError("Please enter a valid URL for the cover image.");
      return;
    }

    if (!isValidUrl(mp3URL)) {
      setValidationError("Please enter a valid URL for the cover image.");
      return;
    }

    const newSong = { title, coverImage,mp3URL, albumId };

    addDoc(collection(db, "songs"), newSong)
      .then(() => {
        onCreateSong(newSong);
        setTitle("");
        setCoverImage("");
        setMP3URL("")
        setValidationError("");
        onClose();
      })
      .catch((error) => {
        console.error("Error adding song to Firebase:", error.message);
        setValidationError("An error occurred. Please try again.");
      });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        backgroundImage="url('https://media.discordapp.net/attachments/1159140637900292207/1180017645509148702/blurarijit.png?ex=657be412&is=65696f12&hm=254450f8f5e226150853198013ae8c812ede4b4886ae7616fafb6ba79eb58fa1&=&format=webp&quality=lossless&width=768&height=432')"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        alignSelf="center"
        backgroundColor="#ffffff"
        boxShadow="20px 20px 100px 200px #0000009c"
      >
        <ModalHeader
          color="white"
          fontSize="30px"
          textAlign="center"
          textShadow="2px 3px #000000d0"
          fontFamily="serif"
        >
          Create Song
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <FormControl>
            <FormLabel
              color="white"
              fontWeight="bold"
              fontFamily="serif"
              textShadow="2px 2px #000000d0"
            >
              Title <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input
              backgroundColor="#00000049"
              border="1px solid #676767"
              pl={2}
              boxShadow="0px 5px 10px 3px rgba(0, 0, 0, 0.608)"
              color="white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel
              mt={2}
              color="white"
              fontWeight="bold"
              fontFamily="serif"
              textShadow="2px 2px #000000d0"
            >
              Cover Image URL <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input
              backgroundColor="#0000006c"
              pl={2}
              color="white"
              boxShadow="0px 5px 10px 3px rgb(0, 0, 0)"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              border="1px solid #676767"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              color="white"
              fontWeight="bold"
              fontFamily="serif"
              textShadow="2px 2px #000000d0"
            >
              MP3 URL Link <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input
              backgroundColor="#00000049"
              border="1px solid #676767"
              pl={2}
              boxShadow="0px 5px 10px 3px rgba(0, 0, 0, 0.608)"
              color="white"
              value={mp3URL}
              onChange={(e) => setMP3URL(e.target.value)}
            />
          </FormControl>
          {validationError && (
            <Box mt={4} color="red">
              {validationError}
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            width="8vw"
            mb={2}
            mr={5}
            color="white"
            background="linear-gradient(to bottom, rgb(17, 191, 75), #00000047 )"
            boxShadow="0px 3px 10px 5px rgba(0, 2, 1, 0.439)"
            textShadow="1px 1px #121212d0"
            fontFamily="serif"
            borderRadius="60px"
            _hover={{
              background:
                "linear-gradient(to bottom, rgb(71, 71, 71), #06060680 )",
              boxShadow: "0px 3px 5px 5px rgba(0, 0, 0, 0.8)",
            }}
            onClick={handleSaveSong}
          >
            Save Song
          </Button>
          <Button
            width="6vw"
            mb={2}
            variant="ghost"
            color="white"
            bgColor="#2eb3c8df"
            background="linear-gradient(to bottom, rgb(12, 107, 166), #00000047 )"
            boxShadow="0px 3px 10px 5px rgba(0, 2, 1, 0.439)"
            fontFamily="serif"
            borderRadius="70px"
            _hover={{
              background:
                "linear-gradient(to bottom, rgb(71, 71, 71), #06060680 )",
              boxShadow: "0px 3px 5px 5px rgba(0, 0, 0, 0.8)",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSongForm;
