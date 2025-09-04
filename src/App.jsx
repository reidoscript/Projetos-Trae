import './App.css';
import BudgetForm from './components/BudgetForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <h1>Gerador de Orçamentos</h1>
      </header>
      <main>
        <BudgetForm />

      </main>
    </div>
  );
}

export default App;
