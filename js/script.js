
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const itemsPerPage = 9;
// 'showPage' creates a page that shows 9 students
function showPage(list, page) {

  const start = (page * itemsPerPage) - itemsPerPage;
  const end = page * itemsPerPage;
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  console.log(list.length);

  for (let i = 0; i < list.length; i++) {
    if (i >= start && i < end) {
      studentList.insertAdjacentHTML('beforeend', `
        <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}/span>
      </div>
    </li>
    `)
    }
  }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  const numOfPages = (list.length / itemsPerPage);
  const linkList = document.querySelector('.link-list');
  linkList.innerHTML = '';

  for (let i = 0; i < numOfPages; i++) {
    linkList.insertAdjacentHTML('beforeend', `
    <li>
    <button type="button">${[i + 1]}</button>
   </li>
    `)
  }
  const firstButton = linkList.querySelector('button:first-child');
  firstButton.classList.add('active');

  // select first pagination button and give classname of active

  linkList.addEventListener('click', (e) => {
    const clicked = e.target;
    console.log(clicked);
    // toggle active on clicked page button
    if (clicked.tagName === 'BUTTON') {
      const active = linkList.querySelector('.active');

      if (active) {
        active.classList.remove('active');
      }

      clicked.classList.add('active');
      showPage(list, clicked.textContent)
    }
  })
}

function addSearch(list) {
  const header = document.querySelector('.header');
  header.insertAdjacentHTML('beforeend', `
    <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
  `)

  const searchInput = document.querySelector('#search');
  searchInput.addEventListener('keyup', () => {
    let searched = document.querySelector('#search').value.toUpperCase();
    let newList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].name.first.toUpperCase().includes(searched) || list[i].name.last.toUpperCase().includes(searched)) {
        // console.log(list[i])
        newList.push(list[i]);
      }
      console.log(newList);
    }
    showPage(newList, 1);
    addPagination(newList);
  })
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearch(data);

/** Almost done, finish the search input logic
 * Watch the treehouse simple search video 
 * https://teamtreehouse.com/library/fsjs-project-warm-up-simple-search
 */