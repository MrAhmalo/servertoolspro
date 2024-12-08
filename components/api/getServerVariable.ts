import http from '@/api/http';
import { ServerContext } from '@/state/server';

export const getServerVariable = async (uuid: string, key: string): Promise<any> => {
    const panelUrl = window.location.origin;
    // Convert panel.domain.com to pterodactyl-node.domain.com
    const apiUrl = panelUrl.replace('panel.', 'pterodactyl-node.');
    return http.get(`${apiUrl}/api/servers/${uuid}/data/${key}`);
}; 