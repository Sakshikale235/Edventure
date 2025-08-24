import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const saveScore = async (userId: string, score: number, wrongTopics: string[]) => {
  try {
    await addDoc(collection(db, "scores"), {
      userId,
      score,
      wrongTopics,
      date: new Date(),
    });
    console.log("Score saved!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
