import { useState } from 'react';
import './App.css';
import { Column } from './components/column';

interface Columna {
  id: number; 
  array: Note[];
}

function App() {
  const [id,setid]=useState(3)

  const [columns, setColumns] = useState<Columna[]>([
    {
      id: 1, // Nuevo: Asignar un id único
      array: [{ title: "nota1", text: "texto1" }]
    },
    {
      id: 2, // Nuevo: Asignar un id único
      array: [{ title: "nota2", text: "texto2" }]
    }
  ]);

  const addColumn = ({  title, text }: { columnTitle: string; title: string; text: string }) => {
    const newColumn: Columna = { id: id,  array: [{ title, text }] }; // Nuevo: Generar un nuevo id único
    setColumns([...columns, newColumn]);
    setid(id+1)
  };

  const deleteColumn = (id: number) => { // Cambiado: Recibe el id de la columna a eliminar

    const updatedColumns = columns.filter(column => {
      console.log(column.id ,id);
      
      
      return column.id !== id}); // Nuevo: Filtrar las columnas para eliminar la que tenga el id dado
    console.log(updatedColumns);
    
    setColumns(updatedColumns);

  };

  return (
    <div className="flex flex-col items-center p-2 h-full">
      <h1 className="bg-slate-100 rounded-full w-96 text-4xl text-gray-600 hover:text-black">MEMO PRACTICE</h1>
      <div className='flex justify-evenly w-full items-center h-4/5'>
        {columns.map((column) => (
          <Column
            key={column.id} // Cambiado: Usar el id como clave en lugar del índice
            column={column.array}
            id={column.id}
            onDelete={deleteColumn}
          />
        ))}
        <button onClick={() => addColumn({ columnTitle: `columntittle= this id is ${id}`, title: "aaa", text: "aaa" })} className="w-20 h-20 bg-slate-700 text-6xl text-white rounded-2xl border-4 border-slate-900 hover:bg-gray-800">
          <span className="relative bottom-2">+</span>
        </button>
      </div>
    </div>
  );
}

export default App;
