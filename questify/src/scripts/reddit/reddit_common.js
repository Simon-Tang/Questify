function getRedditUsername() {
  const e = document.querySelector('#header-bottom-right > .user > a');
  // RES may be hiding username - respect the setting
  const u = getComputedStyle(e, ':after').getPropertyValue('content');
  return u.replace('"', '').replace('"', '') || e.textContent;
}

class QuestSidebar extends Component {
  constructor() {
    super('nav', 'quest-sidebar');
    const header = this.element.appendChild(createElement({
      classList: ['quest-sidebar_header'],
      textContent: 'Menu',
    }));
    // header.appendChild();
  }
  addLink(label, onClick, isActive) {
    const item = createElement({
      classList: ['quest-sidebar_item'],
      children: [createElement({
        type: 'a',
        textContent: label,
        onClick,
        classList: (isActive ? ['active'] : []),
      })],
    });
    this.element.appendChild(item);
  }
}

document.title = 'Quest';

// Make sidebar
const divContent = document.querySelector('div.content');
const sidebar = new QuestSidebar();
document.body.insertBefore(sidebar.element, document.querySelector('body > .side'));
document.querySelectorAll('.tabmenu > li').forEach(tab => {
  const a = tab.querySelector('a');
  const label = a.textContent || getComputedStyle(a, ':before').getPropertyValue('content').replace('"', '').replace('"', '');
  sidebar.addLink(label, () => a.click());
});

// Move subreddit home link into the right-hand-side
const homeLink = document.querySelector('span.pagename');
homeLink.querySelector('a').textContent = 'Home';
document.querySelector('#header-bottom-right').prepend(createElement({ type: 'span', classList: ['separator'], textContent: '|' }));
document.querySelector('#header-bottom-right').prepend(homeLink);

// Make RES header links less obvious
const resAcctSwitchIcon = document.querySelector('#RESAccountSwitcherIcon');
if (resAcctSwitchIcon) {
  resAcctSwitchIcon.style.background = 'none';
  resAcctSwitchIcon.textContent = '▼';
}
const resSettingsButton = document.querySelector('#RESSettingsButton');
if (resSettingsButton) {
  resSettingsButton.textContent = 'customize';
}

// Swap home and /r/uwaterloo links in header
const logo = document.querySelector('#header-img');
[logo.href, homeLink.href] = [homeLink.href, logo.href];
document.querySelector('#header-img-a').title = '/r/uwaterloo';
homeLink.title = 'Front page';

// Move upvote/downvote buttons into titlebars, for both posts and comments
document.querySelectorAll('.thing').forEach(post => {
  // .title for posts, .tagline for comments
  const title = post.querySelector('.title') || post.querySelector('.tagline');
  if (!title) {
    return;
  }
  // Don't move original arrows; can get messy with the Reddit JS + RES keyboard shortcuts
  Array.from(post.querySelectorAll(':scope > .midcol > .arrow')).reverse().forEach((arrow) => {
    const newArrow = createElement({
      classList: arrow.classList,
      // TODO: figure out why there is no explicit onClick listener needed
    });
    // Update these arrows when the original arrows change
    const cl = newArrow.classList;
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          cl.forEach(c => cl.toggle(c, arrow.classList.contains(c)));
          arrow.classList.forEach(c => cl.add(c));
        }
      });
    }).observe(arrow, { attributes: true });
    title.prepend(newArrow);
  });
  // Add post score
  if (title.classList.contains('title')) {
    ['unvoted', 'dislikes', 'likes'].forEach(c => {
      const domain = title.querySelector('.domain');
      const origScore = post.querySelector(`.score.${c}`);
      if (origScore) {
        let pts;
        if (origScore.textContent === '1') {
          pts = '1 point';
        } else {
          pts = origScore.textContent.replace(' points', '') + ' points';
        }
        const score = createElement({
          type: 'span',
          textContent: ` (${pts}) `,
          classList: origScore.classList,
        });
        title.insertBefore(score, domain);
      }
    });
  }
});

// Manually applying styles now
document.querySelectorAll(`
  div.entry > div.top-matter > ul > li a,
  .titlebox ul li,
  :not(#header-bottom-right) > .flat-list > li a,
  .side > div > div > ul > li > div > div.right > a,
  .account-activity-box a,
  .sidebox a
`).forEach(makeQuestButton);

document.querySelector('html').classList.remove('res-commentBoxes-rounded');

document.querySelectorAll('h1').forEach(e => e.classList.add('quest-h1'));
