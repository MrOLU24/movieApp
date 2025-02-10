import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRTIE_COLLECTTION_ID;

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1");
client.setProject(PROJECT_ID);

const database = new Databases(client);
export const updateSearchCount = async (searchValue, movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchValue", searchValue),
    ]);
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: (doc.count ?? 0) + 1,
      });
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchValue,
            count: 1,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        })
    }
  } catch (error) {
    console.error(error);
  }
};
