import echoServer from "./websockets/echoServer.js";
import broadcastServer from "./websockets/broadcastServer.js";
import forwardServer from "./websockets/forwardServer.js";


// echoServer.listen(3001)
// broadcastServer.listen(3002)
forwardServer.listen(3003)