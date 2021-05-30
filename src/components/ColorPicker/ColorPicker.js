import React, { useState, useEffect } from "react";
import { SwatchesPicker } from "react-color";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { colorChange } from "../../actions";
import styled from "styled-components";

const ColorPicker = ({ color, index, name }) => {
  const dispatch = useDispatch();
  const { colorChangeDone } = useSelector((state) => state.chart);
  const [displayColorPicker, setDisplayColorPickerate] = useState(false);
  const [colorHexCode, setColorHexCode] = useState(color);

  const onClickColorPicker = (displayColorPicker) => {
    if (displayColorPicker === false) {
      setDisplayColorPickerate(true);
    } else setDisplayColorPickerate(false);
  };
  useEffect(() => {
    if (colorChangeDone) {
      setDisplayColorPickerate(false);
    }
    dispatch(colorChange({ colorHexCode, name }));
  }, [colorChangeDone, colorHexCode]);

  const Wrapper = styled.div`
    position: relative;
  `;
  const PickerWrapper = styled.div`
    position: absolute;
    top:40px;
    right:0;
    z-index: 100;
  `;
  const ColorButton = styled.button`
    background: #fff;
    width: 100px;
    padding: 10px 0;
    border-radius: 4px;
    border: 1px solid #ddd;
  `;
  return (
    <Wrapper>
      <ColorButton type="button" onClick={() => onClickColorPicker(displayColorPicker)}>
        {displayColorPicker ? "확인" : "색상 수정"}
      </ColorButton>
      {displayColorPicker && (
        <PickerWrapper>
          <SwatchesPicker color={colorHexCode} onChange={(e) => setColorHexCode(e.hex)} />
        </PickerWrapper>
      )}
    </Wrapper>
  );
};

export default ColorPicker;
