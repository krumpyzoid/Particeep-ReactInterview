import styled from 'styled-components';

export const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    width: 100%;
    padding: 1rem;

    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.07), 
                7px 7px 28px rgba(0, 0, 0, 0.07);
`;

export const Bar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: red;

    &:after {
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        width: ${({$progress}) => `${$progress}%`};
        background-color: green;
        content: '';
        z-index: 5;
    }
`;

export const Title = styled.h3`
    font-weight: 700;
`;

export const Category = styled.h4`
    font-weight: 400;
    font-style: italic;
`;

export const Delete = styled.button`
    cursor: pointer;
    user-select: none;

    margin-top: 1rem;
    padding: 0.25rem 0;
    border-radius: 0.25rem;
    background-color: #CE7777;
    width: 100%;
`;
