import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

export default function Cadastro() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const cadastro = (event) =>{
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email
        }
        axios
            .post('http://localhost:8000/api/users/', data)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                console.error("Erro ao cadastrar usuário!", error);
            });
    };

    return (
        <div className="cadastro-wrapper">
            <h1>Cadastre-se</h1>
            <form onSubmit={cadastro} className="cadastro-form">
            <label>
                <p>Usuário</p>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                <p>Email</p>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <p>Senha</p>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <div className="cadastro-button-group">
                <button type="submit" className="cadastro-button">Enviar</button>
                <button type="button" className="cadastro-button" onClick={() => navigate('/login')}>Fazer Login</button>
            </div>
            </form>
        </div>
    );
}