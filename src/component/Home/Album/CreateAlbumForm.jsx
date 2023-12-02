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

const CreateAlbumForm = ({ onCreateAlbum }) => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [validationError, setValidationError] = useState("");

  const isValidUrl = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };

  const handleCreateAlbum = () => {
    setShowDetails(true);
  };

  const handleSaveAlbum = () => {
    if (!title || !coverImage) {
      setValidationError("Please fill in both title and cover image URL.");
      return;
    }

    if (!isValidUrl(coverImage)) {
      setValidationError("Please enter a valid URL for the cover image.");
      return;
    }

    const newAlbum = { title, coverImage };

    addDoc(collection(db, "albums"), newAlbum)
      .then(() => {
        onCreateAlbum(newAlbum);

        setTitle("");
        setCoverImage("");
        setValidationError("");
        setShowDetails(false);
      })
      .catch((error) => {
        console.error("Error adding album to Firebase:", error.message);
        setValidationError("An error occurred. Please try again.");
      });
  };

  const handleClose = () => {
    setTitle("");
    setCoverImage("");
    setValidationError("");
    setShowDetails(false);
  };

  return (
    <Box>
      {!showDetails ? (
        <Button
          mt={0}
          ml={5}
          borderRadius="30px"
          background="linear-gradient(to right, rgb(50, 37, 37),rgb(34, 2, 2) )"
          boxShadow="0px 5px 10px 3px rgba(0, 0, 0, 0.56)"
          colorScheme="teal"
          width="10vw"
          fontFamily="serif"
          onClick={handleCreateAlbum}
        >
          Create Album
        </Button>
      ) : (
        <Modal isOpen={showDetails} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent
            backgroundImage="url('https://media.discordapp.net/attachments/1159140637900292207/1180018077908353105/darshanfarzi.png?ex=657be479&is=65696f79&hm=e6b0a5b6a71c2a759019ab7987358a8e8a98f362fea6f5db521e81b60885d811&=&format=webp&quality=lossless&width=768&height=432')"
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
              Create Album
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
                  Title<span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  backgroundColor="#00000049"
                  pl={2}
                  boxShadow="0px 5px 10px 3px rgba(0, 0, 0, 0.608)"
                  color="white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  border="1px solid #676767"
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
                  Cover Image URL<span style={{ color: "red" }}>*</span>
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
                onClick={handleSaveAlbum}
                _hover={{
                  background:
                    "linear-gradient(to bottom, rgb(71, 71, 71), #06060680 )",
                  boxShadow: "0px 3px 5px 5px rgba(0, 0, 0, 0.8)",
                }}
              >
                Save Album
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
                onClick={handleClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default CreateAlbumForm;
