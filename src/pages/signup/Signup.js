import styled, {css} from "styled-components";
import {Checkbox, Button, TextField} from "@material-ui/core";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
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

const AnimatedButton = styled(Button)(({ theme, isAnimating }) => ({
	marginTop: '20px',
	width: '300px',
	
	animation: isAnimating ? 'oscillate 0.3s forwards' : 'none',
	'&:disabled': {
		animation: 'dropout 1s forwards',
	},
}));

const StyledInput = styled(TextField)`
		&&{
				margin-top: 20px;
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

const Message = styled.p`
		color: ${(props) => (props.isValid ? "green" : "red")};
		font-size: 14px;margin: 4px 0 8px;
		opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

const Signup = () => {
	const bgColor = localStorage.getItem("bgColor");
	const [colors, setColors] = useState("");
	const [user, setUser] = useState([{
		userId: "",
		password: "",
		email: "",
		phone: "",
	},{
		userId: false,
		password: false,
		email: false,
		phone: false,
		}]);
	
	const fields = [
		{ label: 'UserID', name: 'userId', message: '아이디' },
		{ label: 'Password', name: 'password', message: '비밀번호' },
		{ label: 'Email', name: 'email', message: '이메일' },
		{ label: 'Phone Number', name: 'phone', message: '전화번호' }
	];
	
	const validateInput = (name, value) => {
		const regex = {
			userId: /^[a-zA-Z][a-zA-Z0-9]{3,19}$/, // 아이디 정규식
			password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, // 비밀번호 정규식
			email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 이메일 정규식
			phone: /^01[0-9]-\d{3,4}-\d{4}$/ // 전화번호 정규식
		};
		return regex[name]?.test(value) || false;
	};
	
	const navigate = useNavigate();
	const {setColor} = useContext(UserContext);
	
	const colorList = ['lightgrey', 'bisque', 'lightpink', 'aquamarine']; // 색상 배열
	
	const colorClick = (e) => {
		console.log(`Selected color: ${e.target.value}`);
		setColor(e.target.value);
		setColors(e.target.value);
	}
	
	const onChange = (e) => {
		const { name, value } = e.target;
		setUser((prev) => [
			{ ...prev[0], [name]: value },
			{ ...prev[1], [name]: validateInput(name, value) } // 유효성 검사
		]);
	};
	
	const onClickSignup = () => {
		// insert
		navigate("/")
	}
	
	const [clickCount, setClickCount] = useState(0); // 클릭 횟수 상태
	const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태
	const [isDisabled, setIsDisabled] = useState(false); // 버튼 비활성화 상태
	
	const handleClick = () => {
		// 클릭 횟수 증가
		setClickCount((prevCount) => prevCount + 1);
		
		// 애니메이션 시작
		setIsAnimating(true);
		
		// 애니메이션이 끝난 후 애니메이션 상태를 리셋
		setTimeout(() => {
			setIsAnimating(false); // 애니메이션 리셋
		}, 300); // 애니메이션 시간과 일치
		
		// 클릭 횟수가 10번 이상이면 버튼을 비활성화
		if (clickCount + 1 >= 10) {
			setIsDisabled(true); // 버튼 비활성화
		}
		
		// 애니메이션이 끝난 후 애니메이션 상태를 리셋 (혹은 다른 작업을 추가)
		setTimeout(() => {
			setIsAnimating(false); // 애니메이션 리셋
		}, 300); // 애니메이션 시간과 일치
	};
	
	return (
		<>
			{colorList.map(color => (
				<ColorButton key={color} value={color} onClick={colorClick} variant="contained"/>
			))}
			<Container color={colors || bgColor}>
				<h1>회원 가입</h1>
				{fields.map(({ label, name, message }) => (
					<div key={name}>
						<StyledInput label={label} variant="outlined" name={name} value={user[0][name]} onChange={onChange} isValid={(user[0][name])} />
						<Message isValid={user[1][name]} isVisible={user[0][name]}>
							{user[1][name]
								? `사용 가능한 ${message}입니다.`
								: `사용 불가능한 ${message}입니다.`}
						</Message>
					</div>
				))}
				{Object.values(user[1]).every(value => value === true)?<StyledButton variant="contained" color="primary" onClick={onClickSignup}>회원 가입</StyledButton> :
					<AnimatedButton variant="contained" onClick={handleClick} isAnimating={isAnimating} disabled={isDisabled} >회원 가입</AnimatedButton>}
				
			</Container>
		</>
	)
}
export default Signup