import styled, {css} from 'styled-components';

export const Row = styled.div<{gap?: number}>`
  display: flex;

  ${({ gap }) => gap && css`
    gap: ${gap}px;
  `};
`

export const AlignCenterRow = styled(Row)`
  align-items: center;
`

export const JustifyCenterRow = styled(Row)`
  justify-content: center;
`

export const SpaceBetweenRow = styled(Row)`
  justify-content: space-between;
`

export const Column = styled.div<{gap?: number}>`
  display: flex;
  flex-direction: column;

  ${({ gap }) => gap && css`
    gap: ${gap}px;
  `};
`

export const JustifyStartColumn = styled(Column)`
  justify-content: flex-start;
`

export const JustifyCenterColumn = styled(Column)`
  justify-content: center;
  align-items: center;
`

export const JustifyEndColumn = styled(Column)`
  justify-content: flex-end;
  align-items: center;
`

export const ButtonV3 = styled.button<{buttonStyle: 'black' | 'red' | 'green'}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 40px;
  border-radius: 20px;

  ${({ buttonStyle }) => buttonStyle === 'black' && css`
    color: #181833;
    border: 1px solid #181833;
    background: #fff;
  `};

  ${({ buttonStyle }) => buttonStyle === 'red' && css`
    background: #C32604;
    color: #fff;
  `};

  ${({ buttonStyle }) => buttonStyle === 'green' && css`
    background: #33CC66;
    color: #fff;
  `};
`
