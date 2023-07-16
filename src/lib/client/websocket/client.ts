import { events } from './messaging';

let connections = 0;
let websocket: WebSocket | null = null;
let url = '';
export let currentUser = '';

export function connect(server: string, username: string) {
  connections++;
  if (websocket)
    return;

  url = server + username;
  setupWebsocket();
  events.onConnecting();
  currentUser = username;
}

export function disconnect() {
  connections--;
  if (connections < 0)
    connections = 0;

  if (connections === 0) {
    if (websocket) {
      websocket.removeEventListener('close', onClose);
      websocket.close();
      websocket = null;
    }
  }
}

export function send(msg: object) {
  if (websocket) {
    const data = JSON.stringify(msg);
    websocket.send(data);
  }
}

function setupWebsocket() {
  websocket = new WebSocket(url);
  websocket.addEventListener('close', onClose);
  websocket.addEventListener('error', onError);
  websocket.addEventListener('message', onMessage);
  websocket.addEventListener('open', onOpen);
}

function onClose() {
  console.log("client onclose");
  events.onClose();
  setupWebsocket();
}

function onError(ev: Event) {
  console.error(ev);
}

function onOpen() {
  events.onConnected();
}

function onMessage(ev: MessageEvent<string>) {
  events.onMessage(ev.data);
}