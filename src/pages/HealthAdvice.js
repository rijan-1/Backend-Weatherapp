import './HealthAdvice.css'
import { FaTree } from "react-icons/fa";

import { GiTumbleweed } from "react-icons/gi";
import { GiMoldova } from "react-icons/gi";
import { GiGrass } from "react-icons/gi";
export const HealthAdvice = () => {
  return (
    <div className='HealthAdviceBakcground'>
      <div className='HealthAdvicecoverSection' style={{position:'absolute', top: '20%'}}>
        <h1 className='allergytitle'>Allergies</h1>
      
        <div className='HealthAdviceSection'>
          
          
           

            <div className='HealthAdviceBoxes'>
            <FaTree style={{width:'200px'}} />

            <h2>Pollen risk low</h2>

            </div>
            <div className='HealthAdviceBoxes'>
            <GiTumbleweed  />
            <h2>Pollen risk low</h2>
              
            </div>
            <div className='HealthAdviceBoxes'>
            <GiMoldova />
            <h2>Pollen risk low</h2>
              
            </div>
            
            <div className='HealthAdviceBoxes'>
            <GiGrass />
            <h2>Pollen risk low</h2>

            </div>
        


        </div>

      </div>
    </div>
  )
}


