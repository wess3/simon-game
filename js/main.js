"use strict"

const defaults = {
  round: 1,
  counter: 0,
  strictMode: false,
  computerSeries: []
};
const gameLength = 20;
const counterId = document.getElementById("count");
const colors = {
  green: {
    normal: '#009926',
    glow: '#33ff66',
    button: document.getElementById("green"),
    sound: document.getElementById("green-audio")
  },
  red: {
    normal: '#ff0000',
    glow: '#ff6666',
    button: document.getElementById("red"),
    sound: document.getElementById("red-audio")
  },
  yellow: {
    normal: '#ffff00',
    glow: '#ffff66',
    button: document.getElementById("yellow"),
    sound: document.getElementById("yellow-audio")
  },
  blue: {
    normal: '#002699',
    glow: '#809fff',
    button: document.getElementById("blue"),
    sound: document.getElementById("blue-audio")
  }
};
const error = {
  color: '#6d0a0a',
  sound: document.getElementById("error-sound")
};

class Simon {
  constructor() {
    Object.assign(this, defaults);
  }

  startGame() {
    this.updateCounter(1);

    while (this.computerSeries.length < gameLength) {
      this.computerSeries.push(Object.keys(colors)[(Math.floor(Math.random() * 4))]);
    }
    console.log(this.computerSeries);

    bindEvents();
    this.playStep();
  }

  playStep() {
    console.log("round: " + this.round);
    console.log("counter: " + this.counter);

    if (this.round !== 21) {
      const currentColor = this.computerSeries[this.counter];
      console.log(currentColor);
      const button = colors[currentColor].button;

      setTimeout(() => {
        button.style.backgroundColor = colors[currentColor].glow;
        colors[currentColor].sound.play();
      }, 1000);

      setTimeout(() => {
        button.style.backgroundColor = colors[currentColor].normal;
        if (++this.counter < this.round) {
          this.playStep();
        } else {
          this.counter = 0;
        }
      }, 1500);
    } else {
      alert("You have won.");
    }
  }

  playerTurn(turn) {
    console.log("player turn called");
    if (turn === this.computerSeries[this.counter++]) {
      console.log("...good move...");
      console.log(this.round, this.counter);
      if (this.counter === this.round) {
        this.counter = 0;
        this.round++;
        this.updateCounter(1);
        this.playStep();
      }
    } else {
      console.log("...wrong move...");
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
    console.log(this.strictMode);

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
}

function bindEvents() {
  Object.keys(colors).map(color => {
    colors[color].button.addEventListener("click", colorButtonClick.bind(this, color));
  });
}

function unbindEvents() {
  Object.keys(colors).map(color => {
    colors[color].button.removeEventListener("click",  colorButtonClick.bind(this, color));
  });
}

function colorButtonClick(color) {
  colors[color].sound.play();
  colors[color].button.style.backgroundColor = colors[color].glow;
  setTimeout(() => {
    colors[color].button.style.backgroundColor = colors[color].normal;
  }, 500);
  window.simon.playerTurn(color);
};

function restartGame() {
  unbindEvents();
  window.simon = new Simon();
  window.simon.startGame();
}

window.simon = new Simon();
document.getElementById("start").addEventListener("click", () => {
  window.simon.startGame();
});
document.getElementById("restart").addEventListener("click", () => {
  restartGame();
});
document.getElementById("strict").addEventListener("click", () => {
  window.simon.changeStrictMode();
});

const x = document.getElementById("green-audio");

function playAudio() {
  x.play();
}





// THE END
