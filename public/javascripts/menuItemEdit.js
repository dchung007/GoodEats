const editBtns = document.querySelectorAll('.edit-btn')

for (let i = 0; i < editBtns.length; i++) {
  const btn = editBtns[i];
  btn.addEventListener('click', (e) => {
    // let itemId = e.target.id.split('-')[2]
    const itemId = btn.id.split('-')[2]
    // console.log(itemId)
    const form = document.getElementById(`edit-form-${itemId}`)
    if (form.classList.contains('hidden')) {
      form.classList.remove('hidden')
    } else {
      form.classList.add('hidden')
    }
    if (form.classList.contains('hidden')) {
      form.classList.remove('hidden-form')
    } else {
      form.classList.add('hidden-form')
    }

    const submitBtn = document.getElementById(`edit-submit-${itemId}`)
    submitBtn.addEventListener('click', async (submitEvent) => {
      submitEvent.preventDefault()
      const name = document.getElementById(`${itemId}-edit-name`).value
      const description = document.getElementById(`${itemId}-edit-description`).value
      // console.log(name, description)
      // console.log(submitEvent)
      const restaurantId = e.path[2].id.split('-')[1]
      // console.log(restaurantId)
      const res = await fetch(`/restaurants/${restaurantId}/menu-items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description
        })
      })

      const data = await res.json()
      if (data.message === 'New item added!') {
        // console.log(data)
        const nameEle = document.getElementById(`${itemId}-name`)
        const descriptionEle = document.getElementById(`${itemId}-description`)
        nameEle.innerHTML = data.item.name
        descriptionEle.innerHTML = data.item.description
        form.classList.add('hidden')
      } else {
        // create elements with error message
      }
    })

  })
}
