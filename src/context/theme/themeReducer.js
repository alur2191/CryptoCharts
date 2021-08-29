export default  (state, action) => {
    switch (action.type) {
        case "LIGHT":
            return { darkTheme: false };
        case "DARK":
            return { darkTheme: true };
        default:
            return state;
    }
};