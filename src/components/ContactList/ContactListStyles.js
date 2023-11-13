import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Item = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
