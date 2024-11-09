// Backend Code with Debugging (server.js)
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

// CORS 설정
app.use(cors());

// /searchStation 라우트 설정
app.get('/searchStation', async (req, res) => {
    try {
        console.log('Received request for /searchStation'); // 디버깅 로그
        console.log('Query Parameters:', req.query); // 디버깅 로그

        const { stationName, stationClass } = req.query;
        const apiKey = process.env.OD_SAY_API_KEY;

        if (!stationName || !stationClass) {
            console.error('Missing stationName or stationClass'); // 디버깅 로그
            return res.status(400).json({ error: 'Missing stationName or stationClass' });
        }

        if (!apiKey) {
            console.error('API Key is missing from environment variables'); // 디버깅 로그
            return res.status(500).json({ error: 'API Key is not set in environment variables' });
        }

        // ODsay API 호출
        console.log('Calling ODsay API with params:', { apiKey, stationName, stationClass }); // 디버깅 로그
        const response = await axios.get('https://api.odsay.com/v1/api/searchStation', {
            params: {
                apiKey,
                stationName,
                stationClass
            }
        });

        console.log('ODsay API response:', response.data); // 디버깅 로그
        res.json(response.data);
    } catch (error) {
        console.error('Error occurred while fetching data from ODsay API:', error.message); // 디버깅 로그
        if (error.response) {
            console.error('ODsay API response error:', error.response.data); // 디버깅 로그
        }
        res.status(500).json({ error: 'Failed to fetch data from ODsay API' });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
