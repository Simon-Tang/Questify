const usernameH1 = document.createElement('h1');
usernameH1.classList.add('q_h1');
usernameH1.textContent = `${(getRedditUsername() + "'s").replace("s's", "s'")} Student Center`;
divContent.prepend(usernameH1);
