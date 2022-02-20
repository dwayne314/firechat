import { getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  db,
  onSnapshot,
  collection,
  orderBy,
  addDoc,
  query,
  doc,
  updateDoc,
  arrayUnion,
} from "../firebase";
import { addAlert, login, setRooms, setUsers } from "../redux/actions";
import { getAllRooms, getAllUsers } from "../redux/selectors";

const DatabaseContext = createContext({});

export const DatabaseProvider = ({ children }) => {
  const dispatch = useDispatch();

  const allUsers = useSelector(getAllUsers);

  const allRooms = useSelector(getAllRooms);
  const getUserById = (userId) => allUsers.find((user) => user.id === userId);
  const getRoomById = (roomId) => allRooms.find((room) => room.id === roomId);
  const getMembersByRoomId = (roomId) => [
    ...new Set(getRoomById(roomId).chats.map((chat) => chat.userId)),
  ];

  const createRoom = async ({ creatorId, name }) => {
    try {
      await addDoc(collection(db, "ChatRooms"), {
        creatorId,
        name,
        createdAt: Date.now(),
        chats: [],
      });
    } catch (err) {
      dispatch(
        addAlert({
          title: "Database Error",
          message: "Error creating room. Please try again.",
          type: "error",
        })
      );
    }
  };
  const createChat = async ({ roomId, userId, message }) => {
    try {
      const charRef = doc(db, "ChatRooms", roomId);
      await updateDoc(charRef, {
        chats: arrayUnion({ userId, message, createdAt: Date.now() }),
      });
    } catch (err) {
      dispatch(
        addAlert({
          title: "Database Error",
          message: "Error creating chat. Please try again.",
          type: "error",
        })
      );
    }
  };

  const createUser = async ({ uid, displayName, photoURL }) => {
    const getUserByIdQuery = doc(db, "Users", uid);
    let user = await getDoc(getUserByIdQuery);

    if (!user.exists()) {
      try {
        user = await setDoc(doc(db, "Users", uid), {
          fullName: displayName,
          photoURL,
        });
      } catch (err) {
        dispatch(
          addAlert({
            title: "Database Error",
            message: "Error creating user. Please log in again.",
            type: "error",
          })
        );
        return null;
      }
    }
    return { id: uid, fullName: displayName, photoURL };
  };

  const updateUser = async ({ uid, fullName, photoURL }) => {
    const getUserByIdQuery = doc(db, "Users", uid);
    let user = await getDoc(getUserByIdQuery);

    if (user.exists()) {
      try {
        await updateDoc(getUserByIdQuery, {
          fullName,
          photoURL,
        });
      } catch (err) {
        dispatch(
          addAlert({
            title: "Database Error",
            message: "Error updating profile. Please try again.",
            type: "error",
          })
        );
      }

      dispatch(login({ id: uid, fullName, photoURL }));
    }
  };

  useEffect(() => {
    const allChatRoomsQuery = query(
      collection(db, "ChatRooms"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(allChatRoomsQuery, (querySnapshot) => {
      const { docs } = querySnapshot;
      const rooms = docs.map((doc) => ({
        id: doc.id,
        chats: doc.data().chats,
        members: Array.from(
          new Set(doc.data().chats.map((chat) => chat.userId))
        ),
        ...doc.data(),
      }));
      dispatch(setRooms(rooms));
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const allUsersQuery = query(collection(db, "Users"));
    const unsubscribe = onSnapshot(allUsersQuery, (querySnapshot) => {
      const { docs } = querySnapshot;
      const users = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setUsers(users));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <DatabaseContext.Provider
      value={{
        createRoom,
        createChat,
        createUser,
        updateUser,
        allRooms,
        allUsers,
        getUserById,
        getRoomById,
        getMembersByRoomId,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export default function useDatabase() {
  return useContext(DatabaseContext);
}
