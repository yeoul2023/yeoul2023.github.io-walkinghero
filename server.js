const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3000;

// Render의 환경 변수에서 API 키 가져오기
const ODSAY_API_KEY = process.env.OD_SAY_API_KEY;

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
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
