import { collection, getDocs } from "firebase/firestore";
import { db } from "./Config";

async function getAlbumData() {
  const querySnapshot = await getDocs(collection(db, "albums"));
  const albumsData = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data) {
      albumsData.push({ id: doc.id, ...data });
    }
  });

  return albumsData;
}

export default getAlbumData;
