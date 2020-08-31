import React from 'react';
import Cells from './Cells';

function Game(){
  //This function doesn't acually have any functionality beyond compiling the other functions from Cells.js and adding text for the user of the app.
  return(
      
      <section id = "main">
        <div id = "information">
          <h4>What Is It?</h4>
          <p>The Game of Life is two dimensional grid of cells that follows a set of rules. 
            The game is designed so that the behaviors of the cells can be unpredictable and complex.
            The rules of the game are as follows:

            <br/>
            <br/>

            <ul>
              <li>If the cell is alive and has 2 or 3 neighbors, then it remains alive. If not, it dies.</li>
              <li>If the cell is dead and has exactly 3 neighbors, then it comes to life. If not, it remains dead.</li>
            </ul>

            <br/>
            

          </p>

              <p>The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules
              simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this 
              happens is sometimes called a tick. Each generation is a pure function of the preceding one. 
              The rules continue to be applied repeatedly to create further generations.</p>

        </div> 
        <div id = "cells">
          <Cells />
        </div>
      </section>
    )
}

export default Game;