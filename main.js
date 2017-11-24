"use strict"


const gameLength = 20;
const colors = ['green', 'red', 'yellow', 'blue'];
const counterId = document.getElementById("count");
const colorCodes = {
  green: {
    normal: '#009926',
    glow: '#33ff66',
    sound: document.getElementById("green-audio"),
    piece: document.getElementById("green")
  },
  red: {
    normal: '#ff0000',
    glow: '#ff6666',
    sound: document.getElementById("red-audio"),
    piece: document.getElementById("red")
  },
  yellow: {
    normal: '#ffff00',
    glow: '#ffff66',
    sound: document.getElementById("yellow-audio"),
    piece: document.getElementById("yellow")
  },
  blue: {
    normal: '#002699',
    glow: '#809fff',
    sound: document.getElementById("blue-audio"),
    piece: document.getElementById("blue")
  }
};
const error = {
  color: '#6d0a0a',
  sound: document.getElementById("error-sound")
};


class Simon {
  constructor() {
    this.round = 0;
    this.counter = 0;
    this.strictMode = false;
    this.computerSeries = [];
  }

  startGame() {
    this.round = 1;
    this.updateCounter(1);

    while (this.computerSeries.length < gameLength) {
      this.computerSeries.push(colors[(Math.floor(Math.random() * 4))]);
    }
    console.log(this.computerSeries);

    this.playStep();
  }

  playStep() {
    //console.log("round: " + this.round);
    //console.log("counter: " + this.counter);

    if (this.round !== 21) {
      const currentColor = this.computerSeries[this.counter];
      console.log(currentColor);
      const button = document.getElementById(currentColor);

      setTimeout(() => {
        button.style.backgroundColor = colorCodes[currentColor].glow;
        colorCodes[currentColor].sound.play();
      }, 1000);

      setTimeout(() => {
        button.style.backgroundColor = colorCodes[currentColor].normal;
        if (++this.counter < this.round) {
          this.playStep();
        } else {
          this.counter = 0;
        }
      }, 1500);
    } else {
      // Disappointing Alert Message
      alert("You have won.");
    }
  }

  playerTurn(turn) {
    if (turn === this.computerSeries[this.counter++]) {
      //console.log("...good move...");
      if (this.counter === this.round) {
        this.counter = 0;
        this.round++;
        this.updateCounter(1);
        this.playStep();
      }
    } else {
      //console.log("...wrong move...");
      // Error Notification
      count.style.color = error.color;
      error.sound.play();
      setTimeout(() => {
        count.style.color = "#b3d1ff";
      }, 1000);

      if (this.strictMode) {
        this.updateCounter(2);
        this.round = 1;
      }
      this.counter = 0;
      this.playStep();
    }
  }

  changeStrictMode() {
    this.strictMode = !this.strictMode;
    //console.log(this.strictMode);

    const strictModeButton = document.getElementById("strict");
    if (this.strictMode) {
      strictModeButton.style.backgroundColor = "#b3d1ff";
      strictModeButton.style.color = "#000";
    } else {
      strictModeButton.style.backgroundColor = "#404040";
      strictModeButton.style.color = "#b3d1ff";
    }
  }

  updateCounter(message) {
    if (message === 1) {
      if (this.round < 10) {
        counterId.innerHTML = "0" + this.round;
      } else {
        counterId.innerHTML = this.round;
      }
    } else {
      counterId.innerHTML = "01";
    }
  }

  restartGame() {
    this.computerSeries = [];
    this.round = 0;
    this.counter = 0;
    this.startGame();
  }

}

const simon = new Simon();

// Bind Event Listeners
for (let element in colorCodes) {
  const elementButton = colorCodes[element].piece;
  elementButton.addEventListener("click", () => {
    colorCodes[element].sound.play();
    elementButton.style.backgroundColor = colorCodes[element].glow;
    setTimeout(() => {
      elementButton.style.backgroundColor = colorCodes[element].normal;
    }, 500);
    simon.playerTurn(element);
  });
}

document.getElementById("start").addEventListener("click", () => {
  simon.startGame();
});
document.getElementById("restart").addEventListener("click", () => {
  simon.restartGame();
});
document.getElementById("strict").addEventListener("click", () => {
  simon.changeStrictMode();
});





// THE END
