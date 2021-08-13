
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { InputGroupFormControl as FormControl } from "../../components/Form";

export const IconButton = styled(Link)`
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background-color: transparent;
    transition: 0.3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &:hover {
        background-color: ${({ theme }) => theme.primaryLight};
    }
`;

export const Title = styled.h2`
    line-height: 1.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text1};
    margin-top: 1rem;
    margin-bottom: 2rem;
`;

export const TokenWrapper = styled.div`
    background-color: ${({ theme }) => theme.bg1};
    padding: 0 1.125rem;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
`;

export const TokenName = styled.span`
    font-weight: 700;
    margin-right: auto;
    font-size: 1rem;
    color: ${({ theme }) => theme.text1};
`;

export const TokenAddress = styled.span`
    font-weight: 500;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text3};
`;

export const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const DetailsTitle = styled.span`
    color: ${({ theme }) => theme.primary};
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 6px;
`;

export const DetailsLabel = styled.span`
    color: ${({ theme }) => theme.text3};
    font-size: 0.75rem;
    font-weight: 400;
`;

export const Description = styled.p`
    margin-top: 0;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.text1};
`;

export const DescriptionCard = styled.p`
    padding: 1rem;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.bg1};
`;

export const RowTitle = styled.h3`
    margin-top: 0.75rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.text1};
    font-size: 1.25rem;
`;

export const RowDesc = styled.p`
    margin: 0 1rem 2rem;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.text3};
`;

export const InnerCard = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    border-radius: 12px;
    height: 56px;
    border: 1px solid ${({ theme }) => theme.borderColor2};
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
    margin-bottom: 15px;
`;

export const InnerCardLabel = styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text3};
    font-weight: 400;
    line-height: 1;
    margin-bottom: 0.5rem;
`;

export const SelectFormControl = styled(FormControl)`
    display: flex;
    width: 100%;
    border-radius: 12px;
    height: 56px;
    min-height: 56px;
    padding: 0 24px;
    border: none;
    background-color: ${({ theme }) => theme.bg1} !important;

    &:hover,
    &:focus,
    &:active {
        outline: none;
    }
`;

export const Label = styled.span`
    color: ${({ theme }) => theme.text1};
    font-weight: 400;
    font-size: 0.875rem;
    padding: 0 0 0.75rem;
    line-height: 1;
    display: block;

    @media (min-width: 768px) {
        padding: 0 1.5rem 0.75rem;
    }
`;

export const CustomFormControl = styled(FormControl)`
    background-color: ${({ theme }) => theme.bg1} !important;
    padding-left: 24px;
    padding-right: 24px;
`;

export const ListItem = styled(ListGroup.Item)`
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.text1};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0 !important;
    margin-bottom: 6px;

    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.borderColor2};
    }
`;

export const ListItemText = styled.span`
    font-weight: 500;
    font-size: 0.75rem;
    display: block;
    color: ${({ theme }) => theme.text1};

    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;