const env = {
    API_URL: "https://ius-api-test.azurewebsites.net/api",
    // API_URL: "http://localhost:3030/api",
    DEFAULT_DISTANCE: 300,
    dummy_image_url: "https://i.namu.wiki/i/pYXdyFUgTe4k0BE7-ifrTFJJkoG37gkOx3M1QedVLQRKqBYEu-rslOC5OQKiK7Z8lovEylU50LX9fhcJT79r4EqbBzn8S_onkVYsCbJLEO6U4AJPX-zSnUBOc5Z1Z-pZRMgNcQqM2mH1YVHqD2h09A.webp"
}

const colorMap = {

};

const returnColor = (tagName) => colorMap[tagName];

export default env;

export {
    returnColor
}