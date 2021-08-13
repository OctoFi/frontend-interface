import styled from "styled-components";
import { Text } from "rebass";
import { AutoColumn } from "../Column";

export const Dots = styled.span`
    &::after {
        display: inline-block;
        animation: ellipsis 1.25s infinite;
        content: ".";
        width: 1em;
        text-align: left;
    }
    @keyframes ellipsis {
        0% {
            content: ".";
        }
        33% {
            content: "..";
        }
        66% {
            content: "...";
        }
    }
`;

export const PlatformRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 20px 20px;
`;

export const PlatformTitle = styled.h5`
    color: ${({ theme }) => theme.text1};
    font-weight: 500;
    font-size: 1rem;
    padding-left: 1.25rem;
    margin-bottom: 0;
`;

export const ConfirmationText = styled(Text)`
    font-size: 48px;
    line-height: 42px;
    font-weight: 500;

    @media (max-width: 1199px) {
        font-size: 24px;
        font-weight: 700;
    }
`;

export const HeaderAutoColumn = styled(AutoColumn)`
    grid-row-gap: 20px;

    @media (max-width: 1199px) {
        grid-row-gap: 24px;
    }
`;

export const HeaderCurrencyText = styled(Text)`
    font-size: 1.5rem;

    @media (max-width: 1199px) {
        font-size: 1rem;
    }
`;

export const ResponsivePlatformTitle = styled(PlatformTitle)`
    margin-left: 10px;
`;