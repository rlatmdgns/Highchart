# 시계열 라인 차트 구현

## 실행 방법

node -v v14.15.1 로 설치 

`npm i`   

`npm start` 

**dependencies**

```jsx
dependencies: {
	"highcharts": "^9.1.0",
	"highcharts-react-official": "^3.0.0",
	"react": "^17.0.2",
	"react-chartjs-2": "^3.0.3",
	"react-color": "^2.19.3",
	"react-dom": "^17.0.2",
	"react-redux": "^7.2.4",
	"react-scripts": "4.0.3",
	"redux": "^4.1.0",
	"redux-devtools-extension": "^2.13.9",
	"styled-components": "^5.3.0",
}
```

## **프로젝트 소개**

데이터를 기반으로 React 를 활용 및  차트 라이브러리를 사용하여 시계열 차트 만들기 

## **프로젝트 목표**

- highchart라이브러리를 사용하여 요구사항에 맞게 만드는 것이 목표입니다.
- 차트 필수 기능 구현 목표입니다.
- Redux state 전역관리

필수기능 구현 시 추가 목표 

- 드래그앤 드롭
- 달력 기능 추가
- 차트 고도화
- redux ⇒ mobx

## **기술 스택**

- React.js(CRA)
- highcharts
- stlyed-components
- Redux

## **구현 기능**

- fecth를 통해 json 파일 데이터 가져오기
- 차트의 데이터를 csv 형식으로 다운로드
- 항목별 색상, 항목명, 평균값, 최소값, 최대값, 편차 (최대-최소) 이 표시
- 항목별로 차트에 표시할 지 여부를 선택하는 체크박스가 있어야 함
- 항목별로 오른쪽 또는 왼쪽 y축 기준으로 볼 것인지 선택

## **issue 사항**

- highcharts -> chart.js 로 변경
highcharts 가 custom 가이드 설명이 잘. 되어있지 않아 잘 되어있는 chart.js로 변경
- chart.js -> highcharts 다시 변경
chart.js 에 맞게 데이터를 재가공을 해주어야 하는 이슈로 highcharts 라이브러리로 원복
- 최대값, 최소값, 편차 등을 구할 때 데이터안에 NaN이 있을 경우

    ```jsx
    const NaNfilterArr = (arr) => {
     const filterArr = arr.filter((item) => 
    	{
    	 return item !== "NaN" && item !== undefined && item !== ""; 
    	});
     return filterArr; 
    };

    NaN, undefined, "" 일 경우 걸러 주는 필터 함수 이용하여서 처리하였습니다.
    ```

- 차트에 표시할 지 여부를 선택하는 체크박스

    options.series[i].visible = true  , state로 관리를 하지 않고 options에서 처리하고 있어서 초기 렌더링에서 작동하여 redux를 사용하여 변경하게 하였습니다.
