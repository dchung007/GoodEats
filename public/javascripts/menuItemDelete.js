const deleteBtns = document.querySelectorAll('.delete-btn')

for (let i = 0; i < deleteBtns.length; i++) {
  const btn = deleteBtns[i];

  btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const itemId = e.target.id.split('-')[2];
    // console.log(e)
    const restaurantId = e.path[2].id.split('-')[1];
    // console.log(restaurantId);
    const res = await fetch(`menu-items/${itemId}`, {
      method: 'DELETE'
    })

    const data = await res.json()
    if (data.message = "Item deleted.") {
      const container = document.getElementById(`item-container-${itemId}`)
      container.remove()
    } else {

    }
  })
}
