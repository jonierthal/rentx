import styled from 'styled-components/native';

export const Container = styled.View`
   width: 100%;
   height: 50px;

   background-color: ${({ theme }) => theme.colors.main};

   margin-bottom: 8px;
`;