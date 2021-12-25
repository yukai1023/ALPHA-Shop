const form = document.getElementById('a-form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.getElementById('step-control')
const steps = stepControl.querySelectorAll('.stepper-container')
const btnControl = document.getElementById('btn-control')
const nextBtn = btnControl.querySelector('.btn-primary')
const prevBtn = btnControl.querySelector('.btn-outline')
const price = document.getElementById('price')
const totalAmount = document.querySelector('#total-amount')
const feeForm = document.getElementById('fee-form')
let step = 0
/* step & form */
function handleBtnControlClicked (e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches('.btn-primary') && e.target.innerHTML === '下一步 →') {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-outline')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnDisabled()
}

function setBtnDisabled () {
  if (step === 0) {
    prevBtn.classList.add('d-none')
    nextBtn.classList.remove('primary-second')
    nextBtn.classList.add('primary-first')
  } else {
    prevBtn.classList.remove('d-none')
    nextBtn.classList.remove('primary-first')
    nextBtn.classList.add('primary-second')
  }
  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步 →'
  }
}
/* item price */
let cost = 5298
let item1 = 1
let item2 = 1
const item1Price = 3999
const item2Price = 1299
price.addEventListener('click', event => {
  const target = event.target
  const targetIcon = event.target.dataset.icon
  if (targetIcon === 'plus') {
    if (target.previousElementSibling.dataset.id === 'item-1') {
      item1 += 1
      target.previousElementSibling.textContent = item1
      cost += item1Price
      totalAmount.textContent = '$' + cost
    } else if (target.previousElementSibling.dataset.id === 'item-2') {
      item2 += 1
      target.previousElementSibling.textContent = item2
      cost += item2Price
      totalAmount.textContent = '$' + cost
    }
  } else if (targetIcon === 'minus') {
    if (target.nextElementSibling.dataset.id === 'item-1' & item1 > 0) {
      item1 -= 1
      target.nextElementSibling.textContent = item1
      cost -= item1Price
      totalAmount.textContent = '$' + cost
    } else if (target.nextElementSibling.dataset.id === 'item-2' & item2 > 0) {
      item2 -= 1
      target.nextElementSibling.textContent = item2
      cost -= item2Price
      totalAmount.textContent = '$' + cost
    }
  }
})

/* deliver price */
let deliverFee = 0
form.addEventListener('click', event => {
  const targetDeliver = event.target.dataset.deliver
  if (targetDeliver === 'free') {
    cost -= deliverFee
    totalAmount.textContent = '$' + cost
    deliverFee = 0
    feeForm.textContent = '免費'
  } else if (targetDeliver === '500') {
    deliverFee = 500
    cost += deliverFee
    totalAmount.textContent = '$' + cost
    feeForm.textContent = '$500'
  }
})

/* dark mode */
const darkToggle = document.getElementById('dark-toggle')
const darkModeToggleHandler = event => {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

/* listener */
darkToggle.addEventListener('change', darkModeToggleHandler)
btnControl.addEventListener('click', handleBtnControlClicked)
