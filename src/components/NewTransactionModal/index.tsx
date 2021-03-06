import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import closeImg from '../../assets/close.svg';
import outcomeImg from '../../assets/outcome.svg';
import incomeImg from '../../assets/income.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
} 

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  
  // input vazio - titulo
  const [title, setTitle] = useState('')
  // input numérico vazio - valor
  const [value, setValue] = useState(0)
  // input vazio - categoria
  const [category, setCategory] = useState('')
  
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount: value,
      category,
      type,
    })
    setTitle('');
    setValue(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  
  }

  return(
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-native" className="react-modal-content">
      
      <button type="button" onClick={onRequestClose} className="react-modal-close"> 
        <img src={closeImg} alt="Fechar"/>
      </button>
      
      <Container onSubmit={handleCreateNewTransaction}> 
        <h2>Cadastrar Transação</h2>

        <input placeholder="Título" value={title} onChange={event => setTitle(event.target.value)}/>

        <input type="number" placeholder="Valor" value={value} onChange={event => setValue(Number(event.target.value))}/>

        <TransactionTypeContainer>
        
          <RadioBox type="button" onClick={() => setType('deposit')} isActive={type === 'deposit'} activeColor="green">
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>

          <RadioBox type="button" onClick={() => setType('withdraw')} isActive={type === 'withdraw'} activeColor="red">
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>

        </TransactionTypeContainer>


        <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>
        
        <button type="submit">Cadastrar</button>

      </Container>    
    
    </Modal>
  )
}