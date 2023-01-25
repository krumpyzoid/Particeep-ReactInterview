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

    /* This hack allows me to display required tabs with CSS, and therefore to persist state change for the vote without redux, cookies or refetching the updated data 
    I would then use a slice method in movies.jsx l69 and l78 that will destroy and mount components on page change. I am however only used to refetchQuery and server
    side pagination. */
    & > * {
        display: none;
    }
    ${({ $min, $max }) => `
        & > *:nth-child(n+${$min+1}):nth-child(-n+${$max}) {
            display: flex;
        }
    `}
    

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