import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

export const Text = styled.span`
    font-size: 0.75rem;
    font-weight: 400;
    color: ${({ theme }) => theme.text1};

    @media (min-width: 768px) {
        padding-left: 1rem;
        font-size: 0.875rem;
        font-weight: 700;
    }
`;
