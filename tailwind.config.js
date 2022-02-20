module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: (theme) => ({
        "full-minus-header": "calc(100vh - 64px)",
        "scrollable-view-chats": "calc(100vh - 268px)",
        "scrollable-view-chats-desktop": "calc(100vh - 194px)",
      }),
      maxHeight: (theme) => ({
        "scrollable-body": "calc(100vh - 293px)",
      }),
      maxWidth: (theme) => ({
        200: "200px",
      }),
      colors: {
        primaryDark: "#1e1f27",
        secondaryDark: "#2b2c32",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
