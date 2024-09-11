export async function fetchWithErrorHandling(
  url: string,
  options: RequestInit,
): Promise<Response> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      switch (res.status) {
        case 404:
          throw new Error('요청한 리소스를 찾을 수 없습니다. (404)');
        case 500:
          throw new Error('서버에 문제가 발생했습니다. (500)');
        default:
          throw new Error(`요청이 실패했습니다. (상태 코드: ${res.status})`);
      }
    }

    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.error('네트워크 오류 또는 서버 문제:', error.message);

      throw new Error('요청을 처리하는 도중 문제가 발생했습니다.');
    }

    throw error;
  }
}
