import './SheetLogin.css'
import ISheet from '../../../../Interfaces/Sheet'
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function SheetLogin( { sheets }: { sheets: ISheet[] } ) {
  const [selectedSheetIndex, setSelectedSheetIndex] = useState(0);

  const handleSheetClick = (index: number) => {
    setSelectedSheetIndex(index);
  };

  return (
    <>
      <div id="paperSheets">
        <div className="pin red-pin"></div>
        <div className="pin blue-pin"></div>
        <nav className="nav">
          {
            sheets.map((sheet, idx) => (
              <Link key={idx} to={sheet.path} onClick={() => handleSheetClick(idx)} className={selectedSheetIndex === idx ? 'nav-link active' : 'nav-link'}>
                {sheet.title}
              </Link>
            ))
          }
        </nav>
        <div className="content">
          {sheets[selectedSheetIndex].element}
        </div>
      </div>
    </>
  )
}