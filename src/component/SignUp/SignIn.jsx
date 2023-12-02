// SignIn.jsx
import { useEffect, useState } from "react";
import { auth, provider } from "../../Config";
import { signInWithPopup } from "firebase/auth";
import { Flex, useToast } from "@chakra-ui/react";
import Navbar from "./Navbar/Navbar";
import MainContent from "./Banner/MainContent";
import Page from "./CartBanner/Page";
import HomepageContent from "../Home/HomepageContent";

const SignIn = ({albums,setAlbums}) => {

  const [value, setValue] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        toast({
          title: "Sign In Successful",
          status: "success",
          isClosable: true,
          position: "top",
          duration:"2000"
        });
      })
      .catch((error) => {
        console.error("Error during sign-in:", error.message);
        toast({
          title: "Error",
          description: "An error occurred during sign-in. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleImageClick = (image) => {
    setModalOpen(true);
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <>
      <Flex direction="column">
        <Navbar value={value} handleClick={handleClick} setAlbums={setAlbums} />

        <Flex direction="column" align="center" p={4}>
          <Flex
            direction="column"
            align="center"
            p={4}
            style={{
              background:
                "linear-gradient(to right, rgb(6, 47, 50), rgb(0, 11, 22))",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            {!value ? (
              <>
                <MainContent handleImageClick={handleImageClick} />
                <Page
                  isModalOpen={isModalOpen}
                  handleCloseModal={handleCloseModal}
                  selectedImage={selectedImage}
                  handleClick={handleClick}
                />
              </>
            ) : (
              <HomepageContent albums={albums} setAlbums={setAlbums} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default SignIn;
