import React, { useState } from "react";
import { ColorPicker } from "../ColorPicker";
import { Table, Thead, Tbody, ColorPickerWrapper, Symbol } from "./styles";
const ChartTable = ({ options, series, handleSingleCheck, checkItems, handleAllCheck }) => {
  return (
    <div>
      <Table>
        <Thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name=""
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={checkItems.length === series.length ? true : false}
              />
            </th>
            <th>색상</th>
            <th>항목</th>
            <th>평균값</th>
            <th>편차</th>
            <th>최소값</th>
            <th>최대값</th>
            <th>Y축 선택</th>
            <th>색상 수정</th>
          </tr>
        </Thead>
        <Tbody>
          {series.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    onChange={(e) => handleSingleCheck(e.target.checked, index, options)}
                    checked={checkItems.includes(index) ? true : false}
                  />
                </td>
                <td key={data.color}><Symbol color={data.color}/></td>
                <td key={data.name}>{data.name}</td>
                <td>{data.average}</td>
                <td>{data.deviation}</td>
                <td>{data.min}</td>
                <td>{data.max}</td>
                <td></td>
                <td>
                  <ColorPickerWrapper>
                    <ColorPicker color={data.color} index={index} />
                  </ColorPickerWrapper>
                </td>
              </tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default ChartTable;
