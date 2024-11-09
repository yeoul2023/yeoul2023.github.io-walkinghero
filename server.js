const express = require('express');
const cors = require('cors'); // CORS 설정 추가
const app = express();
const fetch = require('node-fetch');

// Render에서 제공하는 포트 번호 사용
const PORT = process.env.PORT || 10000;  // Render는 기본 포트 번호로 10000을 사용합니다

// 환경 변수에서 API 키 가져오기
const ODSAY_API_KEY = process.env.OD_SAY_API_KEY;

// CORS 설정 추가 (프론트엔드와 연결 시 필요)
app.use(cors());

// 정류장 검색 엔드포인트
app.get('/search-station', async (req, res) => {
    const stationName = req.query.stationName;
    if (!stationName) {
        return res.status(400).json({ error: 'stationName 쿼리 매개변수가 필요합니다.' });
    }

    const url = `https://api.odsay.com/v1/api/searchStation?apiKey=${ODSAY_API_KEY}&stationName=${encodeURIComponent(stationName)}&stationClass=1:2`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('ODsay API 호출 오류');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('ODsay API 호출 오류:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
});

// 서버 실행
app.listen(PORT, '0.0.0.0', () => {  // '0.0.0.0'으로 바인딩해서 모든 네트워크 인터페이스에서 연결 가능하도록 설정
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
