# sangsangin-vercel-demo

상상인 개발 교육 **Lesson 3 — Vercel + Supabase 배포 실습**의 데모 사이트입니다.
"Vercel 배포 따라하기" 교육 문서의 스크린샷 캡처 대상으로 쓰입니다.

## 무엇을 보여주나

- 가장 단순한 Next.js 한 페이지 사이트
- 환경변수 `NEXT_PUBLIC_TEAM_NAME` 값을 화면 팀 이름에 표시 → Vercel에서 값을 넣고 재배포하면 화면이 바뀌는 걸 눈으로 확인 (3교시 환경변수 실습)

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
```

## 환경변수

| 키 | 설명 | 예시 |
|----|------|------|
| `NEXT_PUBLIC_TEAM_NAME` | 화면에 표시할 팀 이름 | `1조` |

`.env.local`에 `NEXT_PUBLIC_TEAM_NAME=1조`처럼 넣으면 로컬에서도 반영됩니다.
Vercel에서는 Settings → Environment Variables에 동일하게 추가합니다.
