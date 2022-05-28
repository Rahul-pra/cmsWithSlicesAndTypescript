const authHeaderService = () => {
    const user = JSON.parse(localStorage.getItem('user') as string);

    if (user && user.accessToken) {
        // For Spring Boot back-end
        // return { Authorization: "Bearer " + user.accessToken };

        // for Node.js Express back-end
        return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}

export default authHeaderService