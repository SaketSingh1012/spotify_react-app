import { Avatar, useToast, Flex } from "@chakra-ui/react";
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import CreateAlbumForm from "./Album/CreateAlbumForm";
import { auth } from "../../Config";
import { useAuthState } from "react-firebase-hooks/auth";

const Homepage = ({ Albums }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const logout = () => {
    localStorage.clear();
    toast({
      title: "Log Out Successful",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 2000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleCreateAlbum = (newAlbum) => {
    newAlbum.id = Date.now().toString();

    Albums((prevAlbums) => [...prevAlbums, newAlbum]);
    onClose();
    toast({
      title: "Album Created",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 2000,
    });
  };
  if (user) {
    return (
      <>
        <Flex>
          <Avatar
            src={user.photoURL}
            alt="User Image"
            boxSize="40px"
            objectFit="cover"
            onClick={onOpen}
            cursor="pointer"
            position="fixed"
            top={6}
            right={6}
          />{" "}
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={null}
          >
            <DrawerOverlay />
            <DrawerContent
                      boxShadow="0px 10px 10px 10px rgb(0, 9, 4)"

              height="95%"
              mt={3}
              borderRadius='15px'
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1595422656857-ced3a4a0ce25?q=80&w=450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNpbmdpbmd8ZW58MHx8MHx8fDA%3D')",
              }}
            >
              <Flex direction="column" justify="space-between" h="100%">
                <DrawerCloseButton color="white" />
                <DrawerHeader fontFamily="monospace" padding="10% 0 0 10%">
                  Profile
                </DrawerHeader>
                <CreateAlbumForm onCreateAlbum={handleCreateAlbum} />

                <DrawerFooter>
                  <Flex
                    height="10%"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                  >
                    <Button
                      width="6vw"
                      mr={10}
                      variant="ghost"
                      bgColor="#2eb3c8df"
                      background="linear-gradient(to bottom, rgb(12, 107, 166), #222222 )"
                      boxShadow="0px 3px 10px 5px rgba(0, 2, 1, 0.439)"
                      fontFamily="serif"
                      borderRadius="60px"
                      color="#ffffff"
                      _hover={{
                        background:
                          "linear-gradient(to bottom, rgb(6, 6, 6), #06060680 )",
                        boxShadow: "0px 3px 10px 5px rgba(0, 2, 1, 0.8)",
                      }}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      width="6vw"
                      background="linear-gradient(to bottom, rgb(17, 191, 75), #262525 )"
                      boxShadow="0px 3px 10px 5px rgba(0, 2, 1, 0.439)"
                      textShadow="1px 1px #121212d0"
                      fontFamily="serif"
                      borderRadius="60px"
                      color="#ffffff"
                      _hover={{
                        background:
                          "linear-gradient(to bottom, rgb(6, 6, 6), #06060680 )",
                        boxShadow: "0px 3px 10px 5px rgba(0, 2, 1, 0.8)",
                      }}
                      onClick={logout}
                    >
                      Log Out
                    </Button>
                  </Flex>
                </DrawerFooter>
              </Flex>
            </DrawerContent>
          </Drawer>
        </Flex>
      </>
    );
  }
};

export default Homepage;
