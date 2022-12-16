import React from 'react'

const Tax = ({ setAmount, amount, handlePayTax }) => {

  return (
    <div className='tax'>
        <form onSubmit={handlePayTax}>
            <label htmlFor='amount'>Enter Amount:</label>
            <input type='number' name='amount' placeholder='0' value={amount} onChange={(e) => setAmount(Math.round(e.target.value))}/>
            <input type='submit' value='Done'/>
        </form>
    </div>
  )
}

export default Tax