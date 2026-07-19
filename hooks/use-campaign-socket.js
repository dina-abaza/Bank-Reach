'use client';

import { useEffect, useRef } from 'react';
import { initWebSocket, joinCampaignRoom } from '@/lib/socket';

export function useCampaignSocket({ campaignIds = [], onUpdate, onStats } = {}) {
  // refs تمنع مشكلة الـ stale closure
  const onUpdateRef = useRef(onUpdate);
  const onStatsRef  = useRef(onStats);
  const campaignIdsRef = useRef(campaignIds);
  useEffect(() => { onUpdateRef.current = onUpdate; }, [onUpdate]);
  useEffect(() => { onStatsRef.current  = onStats;  }, [onStats]);
  useEffect(() => { campaignIdsRef.current = campaignIds; }, [campaignIds]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const socket = initWebSocket(token);

    const handleUpdate = (data) => onUpdateRef.current?.(data);
    const handleStats  = (data) => onStatsRef.current?.(data);

    socket.on('campaign-update',        handleUpdate);
    socket.on('campaign-global-update', handleUpdate);
    socket.on('campaign-stats',         handleStats);

    // campaign-stats و message-update بيتبعتوا من السيرفر لغرفة الحملة
    // (campaign:<id>) فقط، مش لغرفة اليوزر — لازم ننضم لكل غرفة حملة بنفسنا
    const joinAllRooms = () => campaignIdsRef.current.forEach((id) => id && joinCampaignRoom(id));

    const onConnect = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.id) socket.emit('subscribe-user-campaigns', user.id);
      joinAllRooms();
    };

    if (socket.connected) {
      onConnect();
    } else {
      socket.on('connect', onConnect);
    }

    return () => {
      socket.off('campaign-update',        handleUpdate);
      socket.off('campaign-global-update', handleUpdate);
      socket.off('campaign-stats',         handleStats);
      socket.off('connect',               onConnect);
    };
  }, []);

  // انضمام فوري لأي حملة جديدة تتضاف للقائمة من غير ما ننتظر إعادة اتصال
  useEffect(() => {
    campaignIds.forEach((id) => id && joinCampaignRoom(id));
  }, [campaignIds]);

  return { joinCampaignRoom };
}
