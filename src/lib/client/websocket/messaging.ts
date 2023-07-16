export function serialize(feature: string, type: string, message: object) {
  const data = JSON.stringify(message);
  const serialized = `${feature}:${type}:${data}`;
  return serialized;
}

function splitSucksLmao(str: string) {
  const typeIdx = str.indexOf(':', 0);
  const dataIdx = str.indexOf(':', typeIdx+1);
  return [str.slice(0, typeIdx), str.slice(typeIdx+1, dataIdx), str.slice(dataIdx+1)];
}

function onMessage(raw: string) {
  const split = splitSucksLmao(raw);
  if (split.length !== 3)
    throw 'Unknown format';

  const featureName = split[0];
  const type = split[1];
  const message = split[2];

  const handler = handlers[featureName][type];
  handler(message);
}

function onClose() {
  console.log("messaging onclose");
  for (const featureName in handlers) {
    console.log("messaging", featureName, "onclose");
    const feature = handlers[featureName];
    feature.onDisconnectedByServer();
  }
}

function onConnecting() {
  for (const featureName in handlers) {
    const feature = handlers[featureName];
    feature.onConnectingToServer();
  }
}

function onConnected() {
  for (const featureName in handlers) {
    const feature = handlers[featureName];
    feature.onConnectedToServer();
  }
}

export const events = {
  onMessage,
  onClose,
  onConnecting,
  onConnected
};

type MessageHandler = (json: string) => void;
type NoArgHandler = () => void;
type Feature = {
  [type: string]: MessageHandler,
  onDisconnectedByServer: NoArgHandler,
  onConnectingToServer: NoArgHandler,
  onConnectedToServer: NoArgHandler
}
const handlers: {
  [feature: string]: Feature
} = {};
export function registerFeature(featureName: string, feature: Feature) {
  console.log("register feature", featureName);
  handlers[featureName] = feature;
}