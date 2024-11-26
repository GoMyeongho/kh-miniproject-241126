import {createGlobalStyle} from 'styled-components';


const GlobalStyle = createGlobalStyle`
		*{
				box-sizing: border-box;
				margin: 0;
				padding: 0;
		}
		
		Button:disabled{
				transition: transform 0.5s ease;
		}
		
		@keyframes oscillate {
				0% {
						transform: rotate(0deg)
				}
				10% {
						transform: translate(0, -5px);
				}
				20% {
						transform: translate(10px, 0px);
				}
				25% {
						transform: rotate(5deg)
				}
				30% {
						transform: translate(0, 5px);
				}
				40% {
						transform: translate(-10px, 0px);
				}
				50% {
						transform: rotate(0deg) translate(0, 0);
				}
				60% {
						transform: translate(0, -5px);
				}
				70% {
						transform: translate(10px, 0px);
				}
				75% {
						transform: rotate(-5deg)
				}
				80% {
						transform: translate(0, 5px);
				}
				90% {
						transform: translate(-10px, 0px);
				}
				100% {
						transform: rotate(0deg);
				}
		}
		@keyframes dropout {
				0% {
						transform: translate(0, 0);
				}
				50% {
						transform: translate(0, 250px);
						opacity: 0.5;
				}
				100% {
						transform: translate(0, 260px);
						opacity: 0;
				}
		}
`

export default GlobalStyle;