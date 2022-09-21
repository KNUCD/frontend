import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, #__next {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        min-height: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    }
    /* @font-face {
        font-family: 'Poppins-Light';
        src: url('/fonts/Poppins-Light.otf') format('otf');
        font-style: normal;
    }
    @font-face {
        font-family: 'Poppins-Medium';
        src: url('/fonts/Poppins-Medium.otf') format('otf');
        font-style: normal;
    }
    @font-face {
        font-family: 'Poppins-Bold';
        src: url('/fonts/Poppins-Bold.otf') format('otf');
        font-style: normal;
        
    }
    @font-face {
        font-family: 'NotoSansKR-Light';
        src: url('/fonts/NotoSansKR-Light.otf') format('otf');
        font-style: normal;
        
    }
    @font-face {
        font-family: 'NotoSansKR-Medium';
        src: url('/fonts/NotoSansKR-Medium.otf') format('otf');
        font-style: normal;
        
    }
    @font-face {
        font-family: 'NotoSansKR-Bold';
        src: url('/fonts/NotoSansKR-Bold.otf') format('otf');
        font-style: normal;
    }
    @font-face {
        font-family: 'GmarketSansLight';
        src: url('/fonts/GmarketSansLight.otf') format('otf');
        font-style: normal;
        
    }
    @font-face {
        font-family: 'GmarketSansMedium';
        src: url('/fonts/GmarketSansMedium.otf') format('otf');
        font-style: normal;
        
    }
    @font-face {
        font-family: 'GmarketSansBold';
        src: url('/fonts/GmarketSansBold.otf') format('otf');
        font-style: normal;
    } */
`;

export default GlobalStyle;
