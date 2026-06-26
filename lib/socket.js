import { io } from 'socket.io-client';

const SOCKET_URL = 'https://auto-teller-back-end-production.up.railway.app';

let socket = null;

export function initWebSocket(token) {
  if (socket) return socket; // إرجاع نفس الـ socket سواء متصل أو لأ

  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('[WS] متصل — id:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.warn('[WS] انقطع الاتصال:', reason);
  });

  socket.on('connect_error', (err) => {
    console.error('[WS] خطأ في الاتصال:', err.message);
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function joinCampaignRoom(campaignId) {
  socket?.emit('join-campaign', campaignId);
}

export function subscribeToUserCampaigns(userId) {
  socket?.emit('subscribe-user-campaigns', userId);
}

export function disconnectWebSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
