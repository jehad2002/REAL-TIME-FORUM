
export function createFooterElement(users) {
  // Créez un élément aside pour représenter la section d'informations du pied de page
  const footerInfoElement = document.createElement("aside");
  footerInfoElement.id = "chat";
  footerInfoElement.classList.add("chatContent", "footer");
  footerInfoElement.style.borderLeft = "1px solid #ccc";
  footerInfoElement.style.borderRight = "1px solid white";
  //console.log(users);
  //footerInfoElement.style.width="auto"
  // Ajoutez le contenu de la section d'informations à l'élément aside

  var allUsers = '';
  // var i =1;
  users.forEach(element => {
    var status;
    var hasNewMessages = element.UnreadMessages > 0; // Vérifiez si l'utilisateur a des nouveaux messages

    if (element.Status == 'on') {
      status = 'status'
    } else {
      status = 'status away'
    }

    // Ajoutez la classe 'new-messages' si l'utilisateur a de nouveaux messages
    var userClass = hasNewMessages ? 'friend new-messages' : 'friend';

    // Ajoutez la balise <span class="notification-icon"> uniquement si hasNewMessages est vrai
    var notificationIcon = hasNewMessages ? `<span class="notification-icon">${element.UnreadMessages} <i class="fas fa-envelope"></i></span>` : '';

    allUsers += `
          <div class="${userClass}  friend${element.Id} " id="${element.Id}">
              <!-- Ajoutez l'ID ici -->
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/${element.Id}_copy.jpg" />
              <p>
                  <strong>${element.Name}</strong>
                  <span class='username'>${element.Username}</span>
                  <span style='display:none;' class='istyping'></span>
                  <span style='display:none;'>${element.Id}</span>
              </p>
              ${notificationIcon}
              <div class="${status}"></div>
          </div>`;

    // i++;
  });

  footerInfoElement.innerHTML = `
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
  
    <div id="chatbox">
    <span style='display:none;' class='istyping'></span>
      <div id="friendslist">
          <div id="topmenu">
              <span class="friends"></span>
                <span class="chats"></span>
                <span class="history"></span>
            </div>
  
            <div id="friends">
              ${allUsers}
              <div id="search">
                <input type="text" id="searchfield" value="Search contacts..." />
              </div>
            </div>

        </div>

        <div id="chatview" class="p1">
            <div id="profile">
                <div id="close">
                    <div class="cy"></div>
                    <div class="cx"></div>
                </div>
                <p>Miro Badev</p>
                <span>miro@badev@gmail.com</span>
            </div>

            <div id="chat-messages">
              <label>Thursday 02</label>
                <div class="message">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                    <div class="bubble">
                      Really cool stuff!
                        <div class="corner"></div>
                        <span>3 min</span>
                    </div>
                </div>

                <div class="message right">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                    <div class="bubble">
                      Can you share a link for the tutorial?
                        <div class="corner"></div>
                        <span>1 min</span>
                    </div>
                </div>

                <div class="message">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                    <div class="bubble">
                      Yeah, hold on
                        <div class="corner"></div>
                        <span>Now</span>
                    </div>
                </div>

                <div class="message right">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                    <div class="bubble">
                      Can you share a link for the tutorial?
                        <div class="corner"></div>
                        <span>1 min</span>
                    </div>
                </div>

                <div class="message">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                    <div class="bubble">
                      Yeah, hold on
                        <div class="corner"></div>
                        <span>Now</span>
                    </div>
                </div>
            </div>

            <div id="sendmessage">
              <input type="text" value="Send message..." />
                <button id="send"></button>
            </div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

    `;
  document.querySelector('main').appendChild(footerInfoElement)
  // }
}

