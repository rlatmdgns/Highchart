import React, { useState, useEffect, useCallback } from "react";
import { SwatchesPicker } from "react-color";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { colorChange } from "../../actions";
import { Wrapper, PickerWrapper, ColorButton } from "./styles";

const ColorPicker = ({ color, index, name }) => {
  const dispatch = useDispatch();
  const { colorChangeDone } = useSelector((state) => state.chart);
  const [displayColorPicker, setDisplayColorPickerate] = useState(false);
  const [colorHexCode, setColorHexCode] = useState(color);

  const onClickColorPicker = useCallback((displayColorPicker) => {
    if (displayColorPicker === false) {
      setDisplayColorPickerate(true);
    } else setDisplayColorPickerate(false);
  }, []);

  useEffect(() => {
    if (colorChangeDone) {
      setDisplayColorPickerate(false);
    }
    dispatch(colorChange({ colorHexCode, name }));
  }, [colorChangeDone, colorHexCode]);

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
