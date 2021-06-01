import React from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import { ColorPicker } from "../ColorPicker";
import { ColorPickerWrapper, Symbol } from "./styles";

const Row = ({ data, onChangeYaxis, handleCheckChange, index}) => {
  return (
    <tr>
      <td>
        {data.visible ? (
          <Input type="checkbox" name="" onChange={() => handleCheckChange(data.name, false)} checked/>
        ) : (
          <Input type="checkbox" name="" onChange={() => handleCheckChange(data.name, true)} checked={false} />
        )}
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
        <Label>
          <Input
            type="radio"
            name={data.name}
            id=""
            checked={data.yAxis === 0 ? true : false}
            onChange={() => onChangeYaxis(data.name, 0)}
          />
          왼쪽
        </Label>
        <Label>
          <Input
            type="radio"
            name={data.name}
            id=""
            checked={data.yAxis === 1 ? true : false}
            onChange={() => onChangeYaxis(data.name, 1)}
          />
          오른쪽
        </Label>
      </td>
      <td>
        <ColorPickerWrapper>
          <ColorPicker color={data.color} index={index} name={data.name} />
        </ColorPickerWrapper>
      </td>
    </tr>
  );
};

Row.propTypes = {};

export default Row;
