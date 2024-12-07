import http from '@/api/http';

export default async (uuid: string, playerUuid: string, reason: string): Promise<void> => {
    await http.post(`/api/client/extensions/servertoolspro/servers/${uuid}/kick`, {
        uuid: playerUuid,
        reason,
    });
};
