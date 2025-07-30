import { ApiClient } from './client';

export const resizeImage = async (payload: ResizeImagePayload) => {
  return ApiClient.post<ResizeImageResponse>(`/api/image/resize`, payload);
};

export const getResizeHistory = async (payload: GetResizeHistoryPayload) => {
  return ApiClient.get<GetResizeHistoryResponse>(
    `/api/image/resize-history?imageId=${payload.id}`
  );
};
