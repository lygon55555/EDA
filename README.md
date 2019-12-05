# EDA
![화면 기록 2019-12-05 오후 8 22 45 2019-12-05 20_25_31](https://user-images.githubusercontent.com/39911797/70231999-c96f2f00-179e-11ea-87ee-19f2eea75388.gif)

## EDA is Emergency Disaster Alert.
Tacotron - generating 손석희's voice <br>
Kakao Maps API - showing Korea map <br>
React - Web front-end <br>
Collected 손석희's voice datasets from JTBC 뉴스룸.<br>
**A web server with a tacotron model is required**

In order to run this app:

```js
npm install
```
Add script tag inside of head tag of public/index.html
```
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR VERIFIED APP KEY&libraries=services,clusterer"></script>
```
Start the app

```js
npm run start
```

## Speech Manual
```
[행정안전부] 오늘 부산 지역에 폭염 경보 발령으로 주의바랍니다.
[서울시청] 서울에 미세먼지 주의. 외출 자제, 수분 섭취 중요.
[진도군청] 오늘부터 태풍 상륙. 태풍 피해 예방 요망.
[행정안전부] 강원도 철원에 한파 경보. 동파, 동사 주의.
```
## Members
* 이상현, 김용현, 김영규, 이예은
## References
* Tacotron : https://github.com/melonicedlatte/multi-speaker-tacotron-tensorflow
* Kakao Maps API : http://apis.map.kakao.com/
