type Listener = () => void;

const openListeners: Set<Listener> = new Set();
const closeListeners: Set<Listener> = new Set();

export function onProfileOpen(fn: Listener) {
  openListeners.add(fn);
  return () => openListeners.delete(fn);
}

export function onProfileClose(fn: Listener) {
  closeListeners.add(fn);
  return () => closeListeners.delete(fn);
}

export function openProfileModal() {
  openListeners.forEach((fn) => fn());
}

export function closeProfileModal() {
  closeListeners.forEach((fn) => fn());
}
