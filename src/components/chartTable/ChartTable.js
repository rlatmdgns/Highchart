import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { yAxisChange } from "../../actions";
import { ColorPicker } from "../ColorPicker";
import { Table, Thead, Tbody, ColorPickerWrapper, Symbol } from "./styles";
const ChartTable = ({ options, series, handleSingleCheck, checkItems, handleAllCheck }) => {
  const dispatch = useDispatch();
  const onChangeYaxis = (name, value) => {
    dispatch(yAxisChange({ name, value }));
  };
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
            console.log(data);
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
                <td key={data.color}>
                  <Symbol color={data.color} />
                </td>
                <td key={data.name}>{data.name}</td>
                <td>{data.average}</td>
                <td>{data.deviation}</td>
                <td>{data.min}</td>
                <td>{data.max}</td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name={data.name}
                      id=""
                      checked={data.yAxis === 0 ? true : false}
                      onChange={() => onChangeYaxis(data.name, 0)}
                    />
                    왼쪽
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={data.name}
                      id=""
                      checked={data.yAxis === 1 ? true : false}
                      onChange={() => onChangeYaxis(data.name, 1)}
                    />
                    오른쪽
                  </label>
                </td>
                <td>
                  <ColorPickerWrapper>
                    <ColorPicker color={data.color} index={index} name={data.name} />
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
