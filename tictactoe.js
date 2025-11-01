let p1;
let p2;
const Game = {
  Gameboard: {
    gameboardarray: [
      [
        { marker: "", position: 1 },
        { marker: "", position: 2 },
        { marker: "", position: 3 },
      ],
      [
        { marker: "", position: 4 },
        { marker: "", position: 5 },
        { marker: "", position: 6 },
      ],
      [
        { marker: "", position: 7 },
        { marker: "", position: 8 },
        { marker: "", position: 9 },
      ],
    ],
    gameisover: function () {
      // التحقق من وجود فائز
      for (let i = 0; i < 3; i++) {
        // فحص الصفوف
        if (
          this.gameboardarray[i][0].marker !== "" &&
          this.gameboardarray[i][0].marker ===
            this.gameboardarray[i][1].marker &&
          this.gameboardarray[i][1].marker === this.gameboardarray[i][2].marker
        ) {
          return true; // هناك فائز
        }

        // فحص الأعمدة
        if (
          this.gameboardarray[0][i].marker !== "" &&
          this.gameboardarray[0][i].marker ===
            this.gameboardarray[1][i].marker &&
          this.gameboardarray[1][i].marker === this.gameboardarray[2][i].marker
        ) {
          return true; // هناك فائز
        }
      }

      // فحص القطر الرئيسي
      if (
        this.gameboardarray[0][0].marker !== "" &&
        this.gameboardarray[0][0].marker === this.gameboardarray[1][1].marker &&
        this.gameboardarray[1][1].marker === this.gameboardarray[2][2].marker
      ) {
        return true;
      }

      // فحص القطر المعاكس
      if (
        this.gameboardarray[0][2].marker !== "" &&
        this.gameboardarray[0][2].marker === this.gameboardarray[1][1].marker &&
        this.gameboardarray[1][1].marker === this.gameboardarray[2][0].marker
      ) {
        return true;
      }
      //draw
      if (this.gameboardarray.flat().every((cell) => cell.marker !== "")) {
        return true; // تعادل
      }

      // إذا لم يوجد فائز بعد
      return false;
    },
  },
};
function playermaker(name, marker) {
  return { name, marker };
}

const items = document.querySelectorAll(".item");
for (let i = 0; i < items.length; i++) {
  items[i].textContent =
    Game.Gameboard.gameboardarray[Math.floor(i / 3)][i % 3].marker;
}
let FirstMove = "X";

items.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (Game.Gameboard.gameisover()) return;
    if (item.textContent !== "") {
      return; // إذا كانت الخانة مشغولة، لا تفعل شيئًا
    }
    item.textContent = FirstMove;
    let row = Math.floor(index / 3);
    let col = index % 3;
    Game.Gameboard.gameboardarray[row][col].marker = FirstMove;
    FirstMove = FirstMove === "X" ? "O" : "X";
    let gameOver = Game.Gameboard.gameisover();

    if (gameOver) {
      let winner = checkwinner();
      if (winner !== "draw") {
        if (winner == "X") alert("the winner is " + p1.name);
        else alert("the winner is " + p2.name);
      } else {
        alert("draw");
      }
    }
    const whoplaysnow = document.querySelector(".divv");
    whoplaysnow.innerHTML = `<h4>${
      FirstMove === "X" ? p1.name : p2.name
    } plays now</h4>`;
  });
});
function checkwinner() {
  // vérifier les lignes
  for (let i = 0; i < 3; i++) {
    if (
      Game.Gameboard.gameboardarray[i][0].marker !== "" &&
      Game.Gameboard.gameboardarray[i][0].marker ===
        Game.Gameboard.gameboardarray[i][1].marker &&
      Game.Gameboard.gameboardarray[i][1].marker ===
        Game.Gameboard.gameboardarray[i][2].marker
    ) {
      return Game.Gameboard.gameboardarray[i][0].marker;
    }
  }

  // vérifier les colonnes
  for (let i = 0; i < 3; i++) {
    if (
      Game.Gameboard.gameboardarray[0][i].marker !== "" &&
      Game.Gameboard.gameboardarray[0][i].marker ===
        Game.Gameboard.gameboardarray[1][i].marker &&
      Game.Gameboard.gameboardarray[1][i].marker ===
        Game.Gameboard.gameboardarray[2][i].marker
    ) {
      return Game.Gameboard.gameboardarray[0][i].marker;
    }
  }

  // vérifier les diagonales
  if (
    Game.Gameboard.gameboardarray[0][0].marker !== "" &&
    Game.Gameboard.gameboardarray[0][0].marker ===
      Game.Gameboard.gameboardarray[1][1].marker &&
    Game.Gameboard.gameboardarray[1][1].marker ===
      Game.Gameboard.gameboardarray[2][2].marker
  ) {
    return Game.Gameboard.gameboardarray[0][0].marker;
  }

  if (
    Game.Gameboard.gameboardarray[0][2].marker !== "" &&
    Game.Gameboard.gameboardarray[0][2].marker ===
      Game.Gameboard.gameboardarray[1][1].marker &&
    Game.Gameboard.gameboardarray[1][1].marker ===
      Game.Gameboard.gameboardarray[2][0].marker
  ) {
    return Game.Gameboard.gameboardarray[0][2].marker;
  }

  return "draw";
}
const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
  const player11 = document.querySelector("#p1");
  const player22 = document.querySelector("#p2");
  let player1 = player11.value;
  let player2 = player22.value;
  console.log(player1, player2);
  p1 = playermaker(player1, "X");
  p2 = playermaker(player2, "O");
  console.log(p1, p2);
  const whoplaysnow = document.querySelector(".divv");
  whoplaysnow.innerHTML = `<h4>${
    FirstMove === "X" ? p1.name : p2.name
  } plays now</h4>`;
});
