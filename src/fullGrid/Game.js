import React from 'react';
import Grid from './Grid';

function Game(){
  //This function doesn't acually have any functionality beyond compiling the other functions from Cells.js and adding text for the user of the app.
  return(
      
      <section id = "main">
        <div id = "information">
          <h4>What Is The Game Of Life?</h4>
          <p>
          The Game of Life is two dimensional grid of cells that follows a set of rules. 
          The game is designed so that the behaviors of the cells can be unpredictable and complex.
          The rules of the game are as follows:

            <br/>
            <br/>

            <ul>
              <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. If not, it dies.</li>
              <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. If not, it remains dead.</li>
            </ul>
            

          </p>

          <p>
          Created in 1970 by John Horton Conway, the game has zero players, meaning that it only requires an initial input and will require nothing
          further. Conway created the game as he was motivated by questions in mathematical logic and by work in simulation games at the time. The 
          initial goal of the Game of Life was to create a cellular automaton that was interesting and unpredictable. He also made certain that his 
          creation would be within the constraints of John von Neumann's definition of life: a creation that can reproduce itself and simulate a Turing 
          Machine. The end result was the Game of Life. 
          </p>

          <p>
          Because the Game of Life can have an infinite number of outcomes, anything that is computable could be computed using the Game of Life, 
          given enough time and a large enough grid. So, in theory, the Game of Life can be as powerful as any computer with unlimited memory
          and no time constraints meaning that it is Turing complete
          </p>

        </div> 
        <div id = "cells">
          <Grid />
        </div>
      </section>
    )
}

export default Game;