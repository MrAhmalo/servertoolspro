import http from '@/api/http';

export default (uuid: string, key: string, value: string): Promise<any> => {
    return http.post(`/api/client/servers/${uuid}/variables/${key}`, {
        value: value
    });
}; 