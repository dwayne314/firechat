// Global Selectors
export const getIsSigningIn = (state) => state.global.isSigningIn;
export const getAlerts = (state) => state.global.alerts;
export const getDarkMode = (state) => state.global.darkModeEnabled;

// User Selectors
export const getAllUsers = (state) => state.users;
export const getCurrentUser = (state) => state.currentUser;

// Chat Room Selectors
export const getAllRooms = (state) => state.chatRooms;
