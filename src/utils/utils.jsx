// 현재 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1)
  const day = String(now.getDate()).padStart(2, '0'); // 일
  return `${year}-${month}-${day}`;
};
