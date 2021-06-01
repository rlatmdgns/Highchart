import styled from 'styled-components'

export const ColorPickerWrapper = styled.div`
  position: relative;
`;
export const Symbol = styled.i`
  border-radius: 50%;
  display: inline-block;
  padding: 10px;
  background: ${(props) => props.color};
`;
