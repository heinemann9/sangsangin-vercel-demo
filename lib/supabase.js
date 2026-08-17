// Supabase에 연결하는 코드.
// 주소(URL)와 열쇠(anon key)는 코드에 직접 쓰지 않고 환경변수에서 읽어온다.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 환경변수가 아직 안 들어간 상태에서도 사이트가 죽지 않게 한다.
// (둘 중 하나라도 없으면 null → 화면에 "아직 연결 안 됨"이 표시된다)
export const isSupabaseReady = Boolean(url && anonKey);

export const supabase = isSupabaseReady ? createClient(url, anonKey) : null;
