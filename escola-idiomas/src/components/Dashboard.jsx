import '../styles/styles.css';
import Header from './Header';
function Dashboard(){
    return(
        <>
            <Header />
            <div className="container">
                <div className="content">
                    <h1 className="welcome-title">Seja bem vindo à escola de idiomas</h1>
                    <p className="description">Fique por dentro de todo nosso conteúdo e plano de aula</p>
                    <p className="credit">Sistema de gerenciamento criado por &copy; Matheus Augusto & Ana Paula</p>
                </div>
            </div>
        </>
    );
}

export default Dashboard;