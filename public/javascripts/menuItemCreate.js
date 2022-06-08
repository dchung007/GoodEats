const createBtns = document.querySelectorAll('.create-submit')

for (let i = 0; i < createBtns.length; i++) {
  const btn = createBtns[i];

  btn.addEventListener('click', async (e) => {
    //e.preventDefault()
    // const itemId = e.target.id.split('-')[2];
    // console.log(e)


    const name = document.getElementById(`create-name`).value
    const description = document.getElementById(`create-description`).value
    // console.log(name, description)

    const restaurantId = e.path[2].id.split('-')[1]
    console.log(e)
    // console.log(restaurantId)
    const res = await fetch(`/restaurants/${restaurantId}/menu-items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description
        })
    })



    const data = await res.json()
    if (data.message === 'New item added!') {
        // console.log(data)
    //const nameEle = document.getElementById(`${itemId}-name`)
    //const descriptionEle = document.getElementById(`${itemId}-description`)
    const nameDiv = document.createElement('div');
    const nameH2 = document.createElement('h2');
    const nameP = document.createElement('p');
    const itemsDiv = getElementById(`restaurant-${restaurant.id}-menu-items`);
    nameH2.innerHTML = name;
    nameP.innerHTML = description;

    nameDiv.appendChild(nameH2);
    nameDiv.appendChild(nameP);

    itemsDiv.appendChild(nameDiv);


    nameEle.innerHTML = data.item.name
    descriptionEle.innerHTML = data.item.description
    form.classList.add('hidden')
    } else {
        // create elements with error message
      }
  })
}
