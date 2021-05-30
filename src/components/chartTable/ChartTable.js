import React from "react";

const ChartTable = ({ series }) => {
  console.log("table", series);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>색상</th>
            <th>항목</th>
            <th>평균값</th>
            <th>편차</th>
            <th>최소값</th>
            <th>최대값</th>
            <th>Y축 선택</th>
            <th>색상 수정</th>
          </tr>
        </thead>
        <tbody>
          {series.map((data) => {
            return (
              <tr>
                <td>{data.color}</td>
                <td>{data.name}</td>
                <td>{data.average}</td>
                <td>{data.deviation}</td>
                <td>{data.min}</td>
                <td>{data.max}</td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
