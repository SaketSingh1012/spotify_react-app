import PropTypes from "prop-types";
import { Box, Image, Text } from "@chakra-ui/react";

const SongImageComponent = ({ image, handleImageClick, text, color }) => {
  return (
    <Box mx={3} boxShadow="md">
      <Image
        src={image}
        alt="Song Image"
        boxSize="200px"
        objectFit="cover"
        cursor="pointer"
        onClick={() => handleImageClick(image)}
        transition="transform 0.2s ease-in-out"
        _hover={{ transform: "scale(1.05)" }}
        boxShadow="0px 5px 10px 3px rgb(0, 0, 0)"
      />
      <Text textAlign="center" mt={2} fontWeight="bold" color={color}>
        {text}
      </Text>
    </Box>
  );
};

SongImageComponent.propTypes = {
  image: PropTypes.string,
  handleImageClick: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default SongImageComponent;
