<!---
<?php

if (isset($_SESSION['email']) && isset($_SESSION['username'])){
}
?>

<?php
session_start();

if (!isset($_SESSION['ID'])){
    header("location: login.php");
    exit();
}

include "connect.php";

$userID = $_SESSION['ID'];
$sql = "SELECT username, email, recovery_key FROM users WHERE ID = $userID";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $_SESSION['username'] = $row["username"];
    $_SESSION['email'] = $row["email"];
    $_SESSION['recovery_key'] = $row["recovery_key"];
} else{
  $_SESSION['username'] = "Unknown";
  $_SESSION['email'] = "";
  $_SESSION['recovery_key'] = "";
}
$conn->close();
$firstLetter = strtoupper(substr($username, 0, 1));

?>
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/dashboard.css" />
    <title>Book-Haven</title>
  </head>
  <body>
    <div class="grid-container">
      <aside class="sidebar">
        <div class="top">
          <img
            src="./images/home_8370943.png"
            class="home-btn info-container"
            alt="Home button"
            data-info="Home"
          />
          <img
            src="./images/search_8371315.png"
            class="search-btn info-container"
            alt="Search button"
            data-info="Search"
          />
        </div>

        <div class="bottom">
          <img
            src="./images/open-book_10143400.png"
            alt="Your bookShelf"
            class="info-container"
            data-info="Your books"
          />
          <img
            src="./images/heart_9045145.png"
            alt="Favorites"
            class="info-container"
            data-info="Favorites"
          />
           <a href="logout.php">
          <img
            src="./images/box-arrow-in-left.svg"
            alt="Log out"
            class="info-container logout"
          />
          </a>
        </div>
      </aside>

      <nav class="navbar">
        <div class="inner-cont">
          <a href="#">
            <h2>BOOK <span>HAVEN</span></h2></a
          >
          <div class="search-nav">
            <input type="text" class="input-el" />
            <button id="search">
              <img src="./images/search_8371315.png" alt="search button" />
            </button>
          </div>

          <!-- Use any element to open/show the overlay navigation menu -->

          <div class="user-icon" onclick="openNav()">
            <img
              src="./images/user.svg"
              id="user-icon"
              class="info-container"
              alt="user icon"
              data-info="User"
            />
          </div>
          <div id="myNav" class="overlay">
                    <a href="javascript:void(0)" class="closeOverlay" onclick="closeNav()">&times;</a>
                    <div class="overlay-content">
                      <ul>
                      <img src="./images/user.svg"> <li><span> Username: <?php echo $_SESSION['username'] ?></span></li>
                      <img src="./images/envelope.svg">  <li> <span> Email Address:</h4> <?php echo $_SESSION['email']?></span> </li>
                      <img src="./images/key.svg">   <li> <span> Recovery Key:</h4> <?php echo $_SESSION['recovery_key']?></span></li>
                      </ul>
                      <p>*Save your recovery key somewhere safe. (Incase of password reset may arise!)</p>
                    </div>
                </div>

        <script>
          let user = null;

          function openNav() {
            const overlay = document.getElementById("myNav");
            if (overlay) {
              displayUserInfoInOverlay();
              overlay.classList.toggle("show");
              overlay.style.height = "40%";
            } else {
              console.error("Overlay element not found");
            }
          }

          function closeNav() {
            const overlay = document.getElementById("myNav");
            if (overlay) {
              overlay.style.height = "0%";
              overlay.classList.remove("show");
            } else {
              console.error("Overlay element not found");
            }
          }


          function displayUserInfoInOverlay() {
            if (user) {
              const welcomeMessage = document.getElementById("welcome-message");
              const userEmail = document.getElementById("user-email");
              const userRecoveryKey =
                document.getElementById("user-recovery-key");

              if (welcomeMessage && userEmail && userRecoveryKey) {
                welcomeMessage.textContent = `Welcome, ${user.username}`;
                userEmail.textContent = user.email;
                userRecoveryKey.textContent = user.recovery_key;
              } else {
                console.error("One or more user detail elements not found");
              }
            } 
          }

          document.addEventListener("DOMContentLoaded", () => {
            fetchUserDetails();
          });

          document
            .getElementById("logout-button")
            .addEventListener("click", () => {
              fetch("logout.php", { method: "POST" })
                .then((response) => response.json())
                .then((data) => {
                  if (data.status === "success") {
                    window.location.href = "login.html";
                  } else {
                    console.error("Logout failed");
                  }
                })
                .catch((error) => console.error("Error:", error));
            });
        </script>
     
      </nav>

      <main class="main-content">
        <div class="notification" id="notification">
          <p id="notificationMessage"></p>
        </div>
        <div class="trends category">
          <h2 class="catalogue" data-category="trends">RECOMMENDED</h2>
          <button class="prev-btn" data-category="trends">&lt;</button>
          <img
            src="./images/book_haven.gif"
            class="giphy-embed"
            alt="preloader"
          />
          <div class="content">
            <!-- Recommended books content -->
          </div>
          <button class="next-btn" data-category="trends">&gt;</button>
        </div>

        <div class="action category">
          <h2 class="catalogue" data-category="action">ACTION</h2>
          <button class="prev-btn" data-category="action">&lt;</button>
          <img
            src="./images/book_haven.gif"
            class="giphy-embed"
            alt="preloader"
          />
          <div class="content">
            <!-- Recommended books content -->
          </div>
          <button class="next-btn" data-category="action">&gt;</button>
        </div>

        <div class="comedy category">
          <h2 class="catalogue" data-category="comedy">COMEDY</h2>
          <button class="prev-btn" data-category="comedy">&lt;</button>
          <img
            src="./images/book_haven.gif"
            class="giphy-embed"
            alt="preloader"
          />
          <div class="content">
            <!-- Recommended books content -->
          </div>
          <button class="next-btn" data-category="comedy">&gt;</button>
        </div>

        <div class="romance category">
          <h2 class="catalogue" data-category="romance">ROMANCE</h2>
          <button class="prev-btn" data-category="romance">&lt;</button>
          <img
            src="./images/book_haven.gif"
            class="giphy-embed"
            alt="preloader"
          />
          <div class="content">
            <!-- Recommended books content -->
          </div>
          <button class="next-btn" data-category="romance">&gt;</button>
        </div>

        <div class="search-div close category">
          <div class="search-header">Search results</div>
          <div class="content"></div>
        </div>

        <div class="library close">
          <div class="lib-header">Your library</div>
          <div class="content"></div>
        </div>

        <div class="favourites close">
          <div class="fav-header">Favorites</div>
          <div class="content"></div>
        </div>

        <div id="bookModal" class="modal">
          <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2 id="modalTitle"></h2>
            <p id="modalAuthor"></p>
            <img id="modalCover" src="" alt="Book Cover" />
            <p id="modalDescription"></p>
            <div id="modal-book-review"></div>
            <button id="readButton">Read</button>
            <button id="addToLibraryButton">Add</button>
            <button id="addToFavouritesButton">Fav</button>
          </div>
        </div>
      </main>
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section about">
            <h2>About Us</h2>
            <p>
              BOOK HAVEN is your go-to destination for discovering and
              discussing great books.
            </p>
          </div>
          <div class="footer-section contact">
            <h2>Contact Us</h2>
            <p>Email: info@bookhaven.com</p>
            <p>Phone: 08127121837</p>
          </div>
          <div class="footer-section social">
            <h2>Follow Us</h2>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 BOOK HAVEN. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
    <script src="dashboard.js" type="module"></script>
    <script src="transitions.js" type="module"></script>
  </body>
</html>



