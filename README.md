# PhoneLink

## 소개

PhoneLink

---

## 기술 스택

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript

---

## 실행 방법

### 1. 프로젝트 클론 및 의존성 설치

```bash
# 루트에서
npm install
# 또는 각각
cd backend && npm install
cd ../frontend && npm install
```

### 2. 개발 서버 실행

```bash
# 루트에서 프론트/백 동시에 실행
npm run dev

# 또는 각각 실행
cd backend && npm run dev
cd frontend && npm run dev
```

- 프론트엔드: http://localhost:5173
- 백엔드: http://localhost:4000

### 3. 빌드

```bash
npm run build
```

---

## 환경 변수 설정

- 프론트엔드: `frontend/.env`
  ```env
  VITE_API_URL=http://localhost:4000
  ```
- 백엔드: `backend/.env` (필요시)

---

## 주요 기능 및 예제


---

## 개발/배포 환경

- Node.js 18+
- npm 9+
- Vite 7+

---

## 라이선스

MIT License