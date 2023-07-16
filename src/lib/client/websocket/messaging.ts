function onMessage(raw: string) {
  const split = raw.split(':', 3);
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