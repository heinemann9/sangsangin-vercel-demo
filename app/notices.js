"use client";

// Supabase에 저장된 공지사항(notices)을 화면에 보여주고,
// GitHub으로 로그인한 사람은 새 공지를 쓸 수 있게 하는 부분.
import { useEffect, useState } from "react";
import { supabase, isSupabaseReady } from "../lib/supabase";

const card = {
  marginTop: "32px",
  padding: "20px 24px",
  borderRadius: "12px",
  background: "#ffffff",
  boxShadow: "0 4px 16px rgba(99,102,241,0.12)",
  fontSize: "15px",
  width: "100%",
  maxWidth: "520px",
  textAlign: "left",
};

const input = {
  width: "100%",
  padding: "10px 12px",
  marginTop: "8px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  fontFamily: "inherit",
};

const button = {
  marginTop: "12px",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  background: "#6366f1",
  color: "#fff",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
};

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  // 목록 불러오기 — RLS의 "누구나 읽기 허용" 정책 덕분에 로그인 없이도 보인다.
  async function loadNotices() {
    const { data, error } = await supabase
      .from("notices")
      .select("id, title, content, created_at")
      .order("id", { ascending: false });

    if (error) {
      setMessage(`목록을 불러오지 못했습니다: ${error.message}`);
      return;
    }
    setNotices(data ?? []);
  }

  useEffect(() => {
    if (!isSupabaseReady) return;

    loadNotices();

    // 로그인 상태 확인 + 이후 로그인/로그아웃 감지
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signInWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: window.location.origin },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setMessage("");
  }

  // 새 공지 저장 — user_id를 본인 것으로 넣어야 RLS의 with check를 통과한다.
  async function addNotice(event) {
    event.preventDefault();
    setMessage("");

    const { error } = await supabase
      .from("notices")
      .insert({ title, content, user_id: user.id });

    if (error) {
      setMessage(`저장 실패: ${error.message}`);
      return;
    }
    setTitle("");
    setContent("");
    setMessage("저장했습니다.");
    loadNotices();
  }

  if (!isSupabaseReady) {
    return (
      <div style={card}>
        <div style={{ color: "#64748b", marginBottom: "6px" }}>
          환경변수 <code>NEXT_PUBLIC_SUPABASE_URL</code> ·{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
        </div>
        <div style={{ fontWeight: 700, fontSize: "18px" }}>
          ⚠️ 아직 설정 안 됨 — Supabase에 연결되지 않았습니다
        </div>
      </div>
    );
  }

  return (
    <div style={card}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <strong style={{ fontSize: "17px" }}>공지사항</strong>
        {user ? (
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            {user.email ?? user.user_metadata?.user_name} ·{" "}
            <button
              onClick={signOut}
              style={{
                background: "none",
                border: "none",
                color: "#6366f1",
                cursor: "pointer",
                fontSize: "13px",
                padding: 0,
              }}
            >
              로그아웃
            </button>
          </span>
        ) : (
          <button onClick={signInWithGitHub} style={{ ...button, marginTop: 0 }}>
            GitHub으로 로그인
          </button>
        )}
      </div>

      {notices.length === 0 ? (
        <p style={{ color: "#94a3b8", margin: 0 }}>아직 등록된 공지가 없습니다.</p>
      ) : (
        <ul style={{ paddingLeft: "1.2em", margin: 0 }}>
          {notices.map((n) => (
            <li key={n.id} style={{ margin: "8px 0" }}>
              <strong>{n.title}</strong>
              {n.content ? ` — ${n.content}` : ""}
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={addNotice} style={{ marginTop: "20px" }}>
          <input
            style={input}
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            style={input}
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" style={button}>
            공지 추가
          </button>
        </form>
      ) : (
        <p style={{ marginTop: "16px", fontSize: "13px", color: "#94a3b8" }}>
          읽기는 누구나 가능합니다. 쓰려면 GitHub으로 로그인하세요.
        </p>
      )}

      {message ? (
        <p style={{ marginTop: "12px", fontSize: "14px", color: "#475569" }}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
