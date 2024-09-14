import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "lama.mobile.native",
  projectId: "66dad5f70021d60092c9",
  databaseId: "66dad814002bebc009a1",
  userCollectionId: "66dad836003c8a619e2e",
  videoCollectionId: "66e52aea002450ef2c20",
  storageId: "66dad99e0021584e1185",
};

const client = new Client();
client.setEndpoint(appwriteConfig.endpoint);
client.setPlatform(appwriteConfig.platform);
client.setProject(appwriteConfig.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

//create User
export async function createUser(email, password, username) {
  try {
    console.log('Creating user with email:', email);

    const newUser = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log('New user created:', newUser);

    if (!newUser) throw new Error('User creation failed');

    const avatarUrl = avatars.getInitials(username);
    console.log('Avatar URL:', avatarUrl);

    await signin(email, password);

    console.log('Creating document in database');

    const createDocs = await database.createDocument(
      appwriteConfig.databaseId,       // Correct order: databaseId first
      appwriteConfig.userCollectionId, // Correct order: collectionId second
      ID.unique(),
      {
        accountId: newUser.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    console.log('Document created:', createDocs);

    return createDocs;
  } catch (error) {
    console.error('Error in createUser:', error.message || error);
    throw new Error(error.message || 'An error occurred');
  }
}
//user login
export const login = async (email, password) => {
  try {
    await account.deleteSession("current");
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
//first get the account 
export async function getAccount(){
  try {
    const getUser = await account.get()
    return getUser
    
  } catch (error) {
    console.log(error);
    
  }
}
//check if there is current account or not 
export async function currentAccount(){
  try {
    const currentUser = await getAccount()
    if(!currentUser) throw Error

    const isUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentUser.$id)]
    );

    if (!cuisUserrrentUser) throw Error;

    return isUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
}}

//get all video post 
export async function getAllVideos() {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(3)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
