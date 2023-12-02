import { Box, Text, Button, Grid } from "@chakra-ui/react";

const AlbumList = ({ albums, onSelectAlbum, onDeleteAlbum }) => {
  return (
    <Grid
      width="100%"
      gridTemplateColumns="1fr 1fr 1fr 1fr"
      rowGap="10px"
      columnGap="20px"
      justifyContent="space-between"
    >
      {albums.map((album) => (
        <Box
          background="linear-gradient(to right, rgb(24, 24, 24),rgb(0, 46, 54))"
          key={album.id}
          mb={4}
          pb={4}
          boxShadow="0px 5px 10px 3px rgba(0, 0, 0, 0.56)"
          transition="transform 0.2s ease-in-out"
          _hover={{ transform: "scale(1.05)" }}
          borderRadius="md"
          p={5}
          height="auto"
          minWidth="150px"
          margin="0px 10px 20px 0px"
          alignContent="center"
        >
          <Text
            mb={1}
            color="white"
            fontSize="md"
            fontWeight="bold"
            textAlign="center"
            fontFamily="monospace"
            textShadow="3px 3px #000000"
          >
            {album.title}
          </Text>
          <Box
            src={album.coverImage}
            alt={album.title}
            pl={5}
            style={{
              backgroundImage: `url(${album.coverImage})`,
              borderRadius: "10px",
              boxShadow: "0px 5px 10px 8px rgba(0, 0, 0, 0.257)",
              width: "200px",
              height: "200px",
              position: "inherit",
              imageRendering: "auto",
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          />
          <Button
            mt={3}
            mr={2}
            width="45%"
            fontSize="12px"
            variant="ghost"
            bgColor="#2eb3c8df"
            background="linear-gradient(to bottom, rgb(12, 107, 166), #00000047 )"
            boxShadow="0px 3px 10px 5px rgba(0, 2, 1, 0.439)"
            fontFamily="sans-serif"
            borderRadius="60px"
            color="white"
            _hover={{
              background:
                "linear-gradient(to bottom, rgb(6, 6, 6), #06060680 )",
              boxShadow: "0px 3px 10px 5px rgba(0, 2, 1, 0.8)",
            }}
            onClick={() => onSelectAlbum(album)}
          >
            View Album
          </Button>
          <Button
            mt={3}
            ml={2.5}
            width="45%"
            fontSize="12px"
            variant="ghost"
            fontFamily="sans-serif"
            borderRadius="60px"
            background="linear-gradient(to bottom, rgb(17, 191, 75), #00000047 )"
            boxShadow="0px 3px 10px 5px rgba(0, 2, 1, 0.439)"
            textShadow="1px 1px #121212d0"
            color="white"
            _hover={{
              background:
                "linear-gradient(to bottom, rgb(6, 6, 6), #06060680 )",
              boxShadow: "0px 3px 10px 5px rgba(0, 2, 1, 0.8)",
            }}
            onClick={() => onDeleteAlbum(album.id)}
          >
            Delete Album
          </Button>
        </Box>
      ))}
    </Grid>
  );
};

export default AlbumList;
