import styled from 'styled-components';

export const Toggle = styled.div`
    display: flex;
    flex-direction: row;
    width: fit-content;

    border: 1px solid lightgray;
    border-radius: 0.25rem;
    margin-top: 1rem;
`;
export const Vote = styled.div`
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: lightgray;
    }
    ${({ $active }) => $active && `
        background-color: lightgray;
    `}
`;
