import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { allCheckChange, unAllCheckChange, yAxisChange } from "../../actions";
import Row from "../Row/Row";
import { Table, Thead, Tbody } from "./styles";
import { checkChange, unCheckChange } from "../../actions";

const ChartTable = ({ options, series }) => {
  const dispatch = useDispatch();
  const onChangeYaxis = useCallback((name, value) => {
    dispatch(yAxisChange({ name, value }));
  }, []);
  const handleAllCheckChange = useCallback((value) => {
    dispatch(allCheckChange({ value }));
  }, []);
  const handleCheckChange = useCallback((name, value) => {
    dispatch(checkChange({ name, value }));
  }, []);
  const visibleArr = series.filter((data) => data.visible === true);
  return (
    <div>
      <Table>
        <Thead>
          <tr>
            <th>
              {visibleArr.length === series.length ? (
                <input
                  type="checkbox"
                  name=""
                  onChange={() => handleAllCheckChange(false)}
                  checked
                />
              ) : (
                <input
                  type="checkbox"
                  name=""
                  onChange={() => handleAllCheckChange(true)}
                  checked={false}
                />
              )}
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
              <Row
                key={data.name}
                data={data}
                onChangeYaxis={onChangeYaxis}
                options={options}
                index={index}
                handleCheckChange={handleCheckChange}
              />
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default ChartTable;
