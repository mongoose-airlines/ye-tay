const swiftBtn = document.getElementById("swiftButton");
const yeezyBtn = document.getElementById("yeezyButton");
const container = document.getElementById("containerDiv");
const lightDarkBtn = document.getElementById("lightDarkButton");
const body = document.getElementById("body");
const quotes = [];

console.log(body)

const colorScheme = {
  dark: false,
  change: function () {
    colorScheme.dark = colorScheme.dark ? false : true;
    const color = colorScheme.dark ? "dark" : "";
    body.setAttribute("class", color)
  },
};

function checkUserColorSchemePreference() {
  if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    colorScheme.change()
  }
}

swiftBtn.addEventListener("click", () => {
  fetch("https://api.taylor.rest/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let newQuote = {};
      newQuote["artist"] = "T-Swift";
      newQuote["quote"] = data.quote;
      quotes.push(newQuote);
      render();
    })
    .catch((err) => {
      console.log(err);
    });
});

yeezyBtn.addEventListener("click", () => {
  fetch("https://api.kanye.rest/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let newQuote = {};
      newQuote["artist"] = "Yeezy";
      newQuote["quote"] = data.quote;
      quotes.push(newQuote);
      render();
    })
    .catch((err) => {
      console.log(err);
    });
});

lightDarkBtn.addEventListener("click", colorScheme.change);

function render() {
  container.innerHTML = "";
  quotes.forEach((quote, idx) => {
    appendDiv(quote["quote"], quote["artist"], idx);
  });
}

function appendDiv(quote, artist, idx) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `
                        <div class="card" id="${artist.toLowerCase()}">
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                <p>${quote}</p>
                                <footer class="blockquote-footer">${artist}</footer>
                                </blockquote>
                            </div>
                            <button id="delButton" class="btn" onClick={deleteQuote(${idx})}>X</button>
                        </div>    
                      `;
  container.appendChild(newDiv);
}

function deleteQuote(idx) {
  quotes.splice(idx, 1);
  render();
}

checkUserColorSchemePreference();




