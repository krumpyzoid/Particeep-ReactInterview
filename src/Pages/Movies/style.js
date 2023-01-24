import styled from 'styled-components';
import { pageContainer } from '@/Styles';

export const Container = styled.div`
    ${pageContainer}
    display: flex;
    flex-direction: row;
    gap: 2rem;
    
    margin-top: 5rem; /* arbitrary margin so it's not at the top of the page */
`;
export const Movies = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export const CardsList = styled.div`

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media screen and (max-width: 800px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-self: flex-end;
    margin-top: 1rem;
`;
export const PaginationButton = styled.div`
    padding: 0.25rem 1rem;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 0.2rem;
    cursor: pointer;
    user-select: none;

    ${({ $disabled }) => $disabled && `
        pointer-events: none;
        background-color: transparent;
    `}
`;