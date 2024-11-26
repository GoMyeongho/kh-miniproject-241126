import styled, {css} from "styled-components";
import {Checkbox, Button, TextField} from "@material-ui/core";
import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserStore";

const Container = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 500px;
		margin: 50px auto;
		padding: 10px 20px;
		background-color: ${props => props.color};
		border-radius: 20px;
		border: 2px solid #ccc;
		box-shadow: 2px 2px 2px #ccc;
		transition: background-color 0.3s ease;

`
const Div = styled.div`
		display: flex;
		align-items: center;
`

const StyledInput = styled(TextField)`
		&&{
				margin-top: 10px;
				width: 300px;
		}
`
const StyledButton = styled(Button)`
		&& {
				margin-top: 20px;
				width: 300px;
		}
`
const ColorButton = styled(Button)`
		&& {
				margin: 10px;
				width: 50px;
				height: 50px;
				background-color: ${props => props.value};
		}
`



const Login = () => {
	const bgColor = localStorage.getItem("bgColor");
	const [colors, setColors] = useState("");
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [isId, setIsId] = useState(false);
	const [isPw, setIsPw] = useState(false);
	
	const navigate = useNavigate();
	const {setName, setColor} = useContext(UserContext);
	
	const colorList = ['lightgrey', 'bisque', 'lightpink', 'aquamarine']; // 색상 배열
	
	const colorClick = e => {
		setColor(e.target.value);
		setColors(e.target.value);
	}
	
	
	const onChangeId = e => {
		setUserId(e.target.value);
		e.target.value.length > 5 ? setIsId(true) : setIsId(false);
	}
	
	const onChangePw = e => {
		setPassword(e.target.value);
		e.target.value.length > 5 ? setIsPw(true) : setIsPw(false);
	}
	
	const onClickLogin = () => {
	
	}
	
	
	return (
		<>
			{colorList.map(color => (
				<ColorButton key={color} value={color} onClick={colorClick} variant="contained"/>
			))}
			<Container color={colors || bgColor}>
				<h1>로그인</h1>
				<StyledInput label="UserID" variant="outlined" value={userId} onChange={onChangeId} />
				<StyledInput label="password" variant="outlined" type="password" value={password} onChange={onChangePw} />
				<Div><Checkbox/>로그인 유지</Div>
				{(isId && isPw) ? <StyledButton variant="contained" color="primary" >로그인</StyledButton> :
					<StyledButton variant="contained" color="primary" disabled>로그인</StyledButton>}
				<Link to="/signup">회원 가입</Link>
			</Container>
			
		</>
		
	)
}
export default Login