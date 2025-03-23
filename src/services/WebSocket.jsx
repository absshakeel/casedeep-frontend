
import { useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = (url, uId, receipientId) => {
const stompClientRef = useRef(null);

useEffect(() => {
const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://casedeep.com:8080/';
const wsUrl = apiUrl.replace(/\/$/, '') + '/ws';
const socket = new SockJS(wsUrl);
const stompClient = Stomp.over(socket);

stompClient.connect(
{},
() => {
// Send a connect message
stompClient.send(
"/app/connect",
{},
JSON.stringify({
type: "connect",
data: { uId: uId },
})
);
},
(error) => {
console.error("WebSocket connection failed:", error);
}
);

stompClientRef.current = stompClient;

return () => {
if (stompClientRef.current && stompClientRef.current.connected) {
try {
stompClientRef.current.send(
"/app/disconnect",
{},
JSON.stringify({
type: "disconnect",
data: { uId: uId },
})
);
} catch (error) {
console.error("Error sending disconnect message:", error);
}

stompClientRef.current.disconnect(() => {
console.log("WebSocket disconnected");
});
}
};
}, [receipientId]);

useEffect(() => {
if (stompClientRef.current && stompClientRef.current.connected) {
console.log("WebSocket is already connected.");
return;
}
}, [uId]);

const sendMessage = (destination, payload) => {
if (stompClientRef.current && stompClientRef.current.connected) {
stompClientRef.current.send(destination, {}, JSON.stringify(payload));
console.log("Message sent successfully:", payload);
} else {
console.error("WebSocket is not connected. Message not sent.");
}
};

return sendMessage;
};

export default useWebSocket;
