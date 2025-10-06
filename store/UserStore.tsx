import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const UserContent = createContext();

// 初始状态
const initialState = {
  UserData: [],
  loading: true,
  error: null,
};

// Reducer
function linkDataReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        UserData: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        UserData: state.UserData.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(linkDataReducer, initialState);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  // 监听 localStorage 中 user_id 的变化
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user_id") {
        setUserId(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // userId 变化时重新请求
  useEffect(() => {
    if (!userId) return;
    async function fetchUserInfo() {
      try {
        const res = await fetch(`/api/login?user_id=${userId}`);
        const data = await res.json();
        dispatch({
          type: "SET_USER",
          payload: data.user,
        });
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: err.message,
        });
      }
    }
    fetchUserInfo();
  }, [userId]);

  return (
    <UserContent.Provider value={{ state, dispatch }}>
      {children}
    </UserContent.Provider>
  );
}

export function useUser() {
  return useContext(UserContent);
}
