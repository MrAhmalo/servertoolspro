import http from '@/api/http';
import { ServerContext } from '@/state/server';

export const setServerVariable = async (uuid: string, key: string, value: string): Promise<any> => {
    const panelUrl = window.location.origin;
    // Convert panel.domain.com to pterodactyl-node.domain.com
    const apiUrl = panelUrl.replace('panel.', 'pterodactyl-node.');
    return http.post(`${apiUrl}/api/servers/${uuid}/data`, {
        key: key,
        value: value
    });
}; 