// MainComponent.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import SongImageComponent from "../SongImage/SongImageComponent";
import songImage1 from "../../../assets/songImage1.jpg";
import songImage2 from "../../../assets/songImage2.jpg";
import songImage3 from "../../../assets/songImage3.jpeg";
import songImage4 from "../../../assets/songImage4.jpg";
import songImage5 from "../../../assets/songImage5.webp";
import songImage6 from "../../../assets/songImage6.jpeg";
import songImage7 from "../../../assets/songImage7.jpeg";
import songImage8 from "../../../assets/songImage8.jpg";

const MainComponent = ({ handleImageClick }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleClick = () => {
    toast({
      title: "Button Clicked",
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Stack mt="12%" mb="10%">
      <Flex direction="row" spacing={4} mb={4} mt={2}>
        <SongImageComponent
          image={songImage1}
          handleImageClick={handleImageClick}
          text="Love Mashup"
          color="teal.500"
        />
        <SongImageComponent
          image={songImage2}
          handleImageClick={handleImageClick}
          text="Arijit Singh"
          color="purple.500"
        />
        <SongImageComponent
          image={songImage3}
          handleImageClick={handleImageClick}
          text="Honey Singh"
          color="blue.500"
        />
        <SongImageComponent
          image={songImage4}
          handleImageClick={handleImageClick}
          text="KK"
          color="orange.500"
        />
      </Flex>
      <Flex direction="row" spacing={4}>
        <SongImageComponent
          image={songImage5}
          handleImageClick={handleImageClick}
          text="Arman Malik"
          color="pink.500"
        />
        <SongImageComponent
          image={songImage6}
          handleImageClick={handleImageClick}
          text="Mohit Chauhan"
          color="red.500"
        />
        <SongImageComponent
          image={songImage7}
          handleImageClick={handleImageClick}
          text="Shreya Ghoshal"
          color="green.500"
        />
        <SongImageComponent
          image={songImage8}
          handleImageClick={handleImageClick}
          text="Monali Thakur"
          color="yellow.500"
        />
      </Flex>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Header</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Song"
                style={{ width: "100%", height: "100%" }}
              />
            )}
            <Button
              bg="gray.900"
              mt={4}
              borderRadius="20px"
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

MainComponent.propTypes = {
  handleImageClick: PropTypes.func,
};

export default MainComponent;
