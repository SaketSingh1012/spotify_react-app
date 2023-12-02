import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../Config";

const AlbumSection = ({ children }) => {
  const [user] = useAuthState(auth);
  if(user){

    return (
      <Box>
      <Text
        fontSize="40px"
        fontFamily="monospace"
        textShadow="6px 5px #000000d0"
        pb={6}
        mt="20vh"
        textAlign="center"
        color="white"
      >
        Welcome {user.displayName}
      </Text>
      <Text
        fontFamily="serif"
        width="100%"
        color="white"
        textAlign="center"
        fontSize="lg"
        fontWeight="bold"
        mb={5}
        textShadow="3px 3px #000000d0"
      >
        Albums
      </Text>
      {children}
    </Box>
  );
};

}
export default AlbumSection;
