import styled from 'styled-components';

export const Filters = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 10rem;
    height: fit-content;
    padding: 1rem;

    background-color: #2B3A55;
`;

export const Title = styled.h3`
    color: white;
`;

export const Filter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    cursor: pointer;
    user-select: none;

    padding: 0.5rem 1rem;
    
    border-radius: 0.25rem;
    color: #fff;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.075);
    }
    ${({ $selected }) => $selected && `
        background-color: rgba(255, 255, 255, 0.075);
    `}
`;

export const Remove = styled.p`
    cursor: pointer;
    user-select: none;

    font-size: 0.75rem;
    color: #fff;
    text-align: center;
    text-decoration: underline;
`;