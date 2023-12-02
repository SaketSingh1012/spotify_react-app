import PropTypes from "prop-types";
import { Flex, Image, Box, Button } from "@chakra-ui/react";
import spotifyLogo from "../../../assets/spotify.webp";
import Homepage from "../../Home/Homepage";

const Navbar = ({ setAlbums, value, handleClick }) => {
  const navbarStyle = {
    background: "linear-gradient(to right, rgb(14, 0, 25),rgb(3, 114, 42))",
    width: "100%",
    height: "80px",
    position: "fixed",
    top: 0,
    left: 0,
    boxShadow: "0px 10px 15px 3px rgba(0, 0, 0, 0.42)",
  };

  const signUpButtonStyle = {
    bgColor: "white",
    size: "lg",
    borderRadius: "20px",
    _hover: {
      bgColor: "lightgray",
    },
  };
  if (setAlbums) {
    return (
      <Flex
        zIndex="+1"
        justify="space-between"
        align="center"
        w="100%"
        p={4}
        style={navbarStyle}
      >
        <Box>
          <Image
            ml="10px"
            src={spotifyLogo}
            alt="Spotify Logo"
            boxSize="100px"
            objectFit="contain"
          />
        </Box>
        <Box>
          {!value ? (
            <Button
              {...signUpButtonStyle}
              onClick={handleClick}
              mr="10px"
              background="linear-gradient(180deg,#137118 26.71%, #000000 99.36%)"
              boxShadow="0px 10px 15px 3px rgba(19, 0, 0, 0.42)"
              color="white"
              borderRadius='30px'
            >
              Sign Up
            </Button>
          ) : (
            <Homepage Albums={setAlbums} />
          )}
        </Box>
      </Flex>
    );
  }
};

Navbar.propTypes = {
  value: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Navbar;
