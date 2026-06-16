export const metadata = {
  title: "상상인 팀 사이트 데모",
  description: "Lesson 3 — Vercel 배포 따라하기 예제 사이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
