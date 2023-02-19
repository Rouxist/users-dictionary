const server = require("./app");
require('dotenv').config();

require(".");

const port = process.env.PORT;

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});