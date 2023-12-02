import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./Config";

async function getSongData(albumId) {
  const songQuery = query(collection(db, "songs"), where("albumId", "==", albumId));

  const querySnapshot = await getDocs(songQuery);
  const songsData = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data) {
      songsData.push({ id: doc.id, ...data });
    }
  });

  return songsData;
}

export default getSongData;
