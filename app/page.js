// 환경변수 NEXT_PUBLIC_TEAM_NAME 값을 화면에 표시한다.
// Vercel에서 이 값을 넣고 재배포하면 아래 팀 이름이 바뀐다 → 환경변수 실습용.
const teamName = process.env.NEXT_PUBLIC_TEAM_NAME || "우리 팀";
const isEnvSet = Boolean(process.env.NEXT_PUBLIC_TEAM_NAME);

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
        background: "linear-gradient(135deg, #f5f7ff 0%, #eef2ff 100%)",
        color: "#1e293b",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <p style={{ fontSize: "18px", color: "#6366f1", margin: 0, fontWeight: 600 }}>
        상상인 Vercel 배포 데모
      </p>
      <h1 style={{ fontSize: "48px", margin: "12px 0 8px" }}>
        {teamName} 사이트
      </h1>
      <p style={{ fontSize: "18px", color: "#475569", margin: 0 }}>
        인터넷에 올라간 우리 팀의 첫 페이지입니다 🎉
      </p>

      <div
        style={{
          marginTop: "32px",
          padding: "16px 24px",
          borderRadius: "12px",
          background: "#ffffff",
          boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
          fontSize: "15px",
        }}
      >
        <div style={{ color: "#64748b", marginBottom: "6px" }}>
          환경변수 <code>NEXT_PUBLIC_TEAM_NAME</code>
        </div>
        <div style={{ fontWeight: 700, fontSize: "18px" }}>
          {isEnvSet ? `✅ 설정됨 → "${teamName}"` : "⚠️ 아직 설정 안 됨 (기본값 표시 중)"}
        </div>
      </div>

      <p style={{ marginTop: "40px", fontSize: "13px", color: "#94a3b8" }}>
        Lesson 3 · Vercel + Supabase 배포 실습 데모
      </p>
    </main>
  );
}
