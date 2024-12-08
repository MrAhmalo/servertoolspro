import http from '@/api/http';

export default (uuid: string, key: string): Promise<any> => {
    return http.get(`/api/client/servers/${uuid}/variables/${key}`);
}; 