import React, { useState, useCallback, useRef } from "react";

import produce from 'immer';


function Cells(){
    let [cycles, setCycles] = useState(0)
    const [numberOfRows, setNumberOfRows] = useState(25);
    const [numberOfColumns, setNumberOfColumns] = useState(25);
    const [operating, setOperating] = useState(false)
    const operations = [
        [0,1],
        [0, -1],
        [1,-1],
        [-1,1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0],
    ]
    const [speed, setSpeed] = useState(1000)

    const [grid, setGrid] = useState(() => {
    const rows = []
        for (let i = 0; i < numberOfRows; i++){
         rows.push(Array.from(Array(numberOfColumns), () => 0))   
        }
        return rows
    });
    const [newGrid, setNewGrid] = useState(() => {
        const newRows = []
            for (let i = 0; i < numberOfRows; i++){
             newRows.push(Array.from(Array(numberOfColumns), () => 0))   
            }
            return newRows
        });

    const operatingRef = useRef(operating);
    operatingRef.current = operating;

    const startGame = useCallback(() => {
        if (!operatingRef.current){
            return;
        }
        if(`${cycles}` == 0){
            setCycles(0)
        } else {
            setCycles(`${cycles}`)
        }
        setGrid((g) => {
            return produce(g, gridCopy => {
            for (let i = 0; i< numberOfRows; i++){
                for (let k = 0; k< numberOfRows; k++){
                    let neighbors = 0;
                    operations.forEach(( [x, y]) => {
                        const newI = i + x;
                        const newK = k + y;
                        if (newI >= 0 && newI < numberOfRows && newK >= 0 && newK < numberOfColumns){
                            neighbors += g[newI][newK]
                        }
                    })
                    if (neighbors < 2 || neighbors> 3){
                        gridCopy[i][k] = 0;
                    } else if (g[i][k] === 0 && neighbors === 3){
                        gridCopy[i][k] = 1
                    }
                }
            }   
                setCycles((cycles++/2)+0.5)
            })           
        })


        setTimeout(startGame, speed)
        
    }, [])

    const changeDimensions = () =>{
        if (numberOfColumns == 25 && numberOfRows == 25) {
            setNumberOfColumns(`${numberOfColumns}`* 2)
            setNumberOfRows(`${numberOfRows}` * 2)
        } else {
            setNumberOfColumns(25)
            setNumberOfRows(25)
        }
    }

    const clear = (e) => {
        e.preventDefault()
        setGrid(newGrid)
        setCycles(0)
    }

    function arrCopy(arr){
        return(JSON.parse(JSON.stringify(arr)))
      }
    
      let gridCopy = arrCopy(grid);

    const seed = ()=>{
        for (let i = 0; i<numberOfRows; i++){
          for (let j = 0; j<numberOfColumns; j++){
            if (Math.floor(Math.random() * 5) === 1){
              gridCopy[i][j] = true;
              
            }
          }
        }
        console.log(gridCopy)
        setGrid(gridCopy)
        console.log("here")
    }

    const increaseSpeed = () => {
        setSpeed(speed + 250)
    }

    const decreaseSpeed = () => {
        setSpeed(speed - 250)
    }


    return(
        <div>
            <h4>Generation Number: {cycles}</h4>
            
            {/* This div contains the code that renders the grid on the screen and will show selected cells */}
            <div 
                id = "game-grid"
                style ={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numberOfColumns}, 20px)`
                }}
            >
                {grid.map((rows , i) =>
                rows.map((columns, k) => <div 
                onClick={() =>{
                const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1
                });
                setGrid(newGrid)
                }}
                key={`${i}-${k}`}
                style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k]? 'rgba(233, 233, 71, 0.836)' : undefined,
                border: 'solid 1px white'}} />)
                )}
            </div>

            <div class = "button-div">
                
                {/* This button is here to clear all cells from the grid */}
                <button onClick={clear}>Clear Grid</button>
                
                {/* This button is here to double the size of the grid */}
                <button onClick={changeDimensions}>{ numberOfRows == 25 ? `Double Grid Size` : `Shrink Grid`}</button>
                
                {/* This button is here to populate the grid with a random seletion of cells */}
                <button type='submit' onClick={seed}>Randomize Cells</button>
                
                {/* This button is here to start the game of lif */}
                <button
                    onClick={ () => {
                        setOperating(!operating);
                        operatingRef.current = true;
                        startGame()}
                    }
                >
                    Start
                </button>
                
                {/* This button exists in order to sop the Game of Life */}
                <button
                    onClick={ () => 
                        {setOperating(!operating);
                        operatingRef.current = false;
                        startGame()}
                    }
                >
                    Stop
                </button>
                
                {/* This button is here to give the user the ability to manually proceed to the next gen of cells */}
                <button
                    onClick={ () => {
                        setOperating(operating);
                        operatingRef.current = true;
                        startGame()
                    }}
                >
                    Next Generation
                </button>

                <button
                    onClick = {increaseSpeed}
                >
                    Accelerate
                </button>


                <button
                    onClick = {decreaseSpeed}
                >
                    Decelerate
                </button>
            </div>
        </div>
    )
}

export default Cells
