
import { collection, addDoc, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const items = req.body;

    try {
      // Clear previous cart items
      const cartCollection = collection(db, "cartItems");
      const querySnapshot = await getDocs(cartCollection);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Add new cart items
      items.forEach(async (item) => {
        await addDoc(cartCollection, item);
      });

      res.status(200).json({ message: "Cart synced with Firebase" });
    } catch (error) {
      res.status(500).json({ error: "Failed to sync cart" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}