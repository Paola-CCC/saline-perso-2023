import { useEffect, useState } from 'react';
import './App.scss';
import InputSearch from './components/atoms/InputText/InputText';
import InputSelect from './components/atoms/InputSelect/InputSelect';
import InputText from './components/atoms/InputText/InputText';

interface Option {
  value: number;
  label: string;
}

const App: React.FC = () => {
  
  const [selectedOptions, setSelectedOptions] = useState<any>('');

  useEffect(() => {
    console.log("selectedOption ", selectedOptions )
  }, [selectedOptions])


  const optionsNext: Option[] = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
    { value: 4, label: 'Option 4' },
    { value: 5, label: 'Option 5' },
    { value: 4, label: 'Option 4' },
    { value: 5, label: 'Option 5' }
  ];

  return (
    <div className="element">


    <InputText
      kind='text'
      placeholder='prénom'
      label="Choisir un élément"
      getValues={(e ) => setSelectedOptions(e)}
      />
    </div>
  );
};

export default App;