
function showLayer(layerId) {
  // Скрыть все слои
  document.querySelectorAll('.layer').forEach(layer => {
    layer.style.display = 'none';
  });
  // Показать выбранный слой
  document.getElementById(layerId).style.display = 'block';
}

import TonWeb from "tonweb";

const tonweb = new TonWeb();

function formate_address(hexAddress) {
  const cleanAddress = hexAddress.substring(2);

  // Преобразуем в массив байтов
  const buffer = Buffer.from(cleanAddress, 'hex');
  
  // Преобразуем в формат Base64 URL (совместимый с адресами TON)
  const base64UrlAddress = TonWeb.utils.bytesToBase64Url(buffer);
  
  console.log(base64UrlAddress);

}


function generateWallet() {
          fetch('/generate_wallet')
              .then(response => response.json())
              .then(data => {
                  let leftColumn = document.getElementById('mnemonics-left');
                  let rightColumn = document.getElementById('mnemonics-right');

                  leftColumn.innerHTML = "";
                  rightColumn.innerHTML = "";

                  data.mnemonics.forEach((word, index) => {
                      let div = document.createElement('div');
                      div.classList.add('mnemonic-item');
                      div.innerHTML = `<span class="mnemonic-number">${index + 1}.</span> ${word}`;

                      if (index < 12) {
                          leftColumn.appendChild(div);
                      } else {
                          rightColumn.appendChild(div);
                      }
                  });
                  let address = data.address;
                  document.getElementById('address').innerText = "Адрес: " + address;

                  // Сохраняем адрес в LocalStorage
                  localStorage.setItem("wallet_address", address);
              })
              .catch(error => console.error('Ошибка:', error));
      }

// Функция загрузки кошелька при открытии страницы
function loadPage() {
  let savedAddress = localStorage.getItem("wallet_address");
  if (savedAddress) {
    showLayer('home-layer')
  }
}
// Загружаем кошелек при старте страницы
document.addEventListener("DOMContentLoaded", loadPage);