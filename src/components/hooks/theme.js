import styled from 'styled-components';

export const Button = ({ children, padding }) => {
    if (!padding) {
        padding = '0.75rem 1.5rem';
    }

    const SpanStyled = styled.span`
        background-color: #219D80;
        padding: ${padding};
        color: white
    `

    return (
        <SpanStyled>{children}</SpanStyled>
    )
}


