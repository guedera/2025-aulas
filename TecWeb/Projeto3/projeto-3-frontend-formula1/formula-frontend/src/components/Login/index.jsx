import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        }
        axios
            .post('http://localhost:8000/api/token/', data)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate('/');
                console.log("Login bem-sucedido!", response.data);
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error);
            });
    };

    return (
    <div className="login-wrapper">
        <h1>Logue-se</h1>
        <form onSubmit={login} className="login-form">
        <label>
            <p>Usuário</p>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
            <p>Senha</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="login-button-group">
            <button type="submit" className="login-button">Enviar</button>
            <button type="button" className="login-button" onClick={() => navigate('/cadastro')}>Registrar-se</button>
        </div>
        </form>
    </div>
    );
}