import styled from "styled-components";

export const AnimatedWrapper = styled.div<{ isActive: boolean }>`
  opacity: ${p => p.isActive ? 1 : 0};
  transition: opacity 0.4s;
`

export const StyledLink = styled.div`
  color: #181833;
  text-transform: uppercase;
  font-weight: 500;
  margin-right: 50px;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.3s 0.2s ease;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: #33CC66;
    bottom: -4px;
    border-radius: 4px;
    transition: all 0.4s cubic-bezier(0.82, 0.02, 0.13, 1.26);
    left: 100%;
  }

  &:hover {
    opacity: 1;
    color: #33CC66;

    &:before {
      width: 40px;
      left: 0;
    }
  }
`