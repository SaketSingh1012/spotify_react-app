import PropTypes from "prop-types";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const Page = ({
  isModalOpen,
  handleCloseModal,
  selectedImage,
  handleClick,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
      <ModalOverlay />
      <ModalContent
        background="linear-gradient(to right, rgb(27, 139, 250),rgb(15,25,35) )"
        boxShadow="20% 20% 25% 23% #0bebff)"
        height="60%"
      >
        <ModalHeader color="white" mt="7%">
          Start listening with a free Spotify account.
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Flex>
            <Box flex="1">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Selected Song"
                  w="100%"
                  h="100%"
                  borderRadius="1rem"
                />
              )}
            </Box>
            <Box flex="1" p={4}>
              <Flex
                justifyContent="center"
                flexDirection="column"
                ml={3}
                mt={12}
              >
                <Text fontWeight={600} fontSize="12pt" color="blue.500" mb={6}>
                  Sign up now to enjoy unlimited music!
                </Text>
                {selectedImage && (
                  <Button
                    colorScheme="yellow"
                    borderRadius="20px"
                    onClick={handleClick}
                  >
                    Sign Up
                  </Button>
                )}
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

Page.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  selectedImage: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Page;
