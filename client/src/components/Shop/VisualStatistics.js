import React from 'react'
import { useSelector } from 'react-redux'
import { Doughnut } from 'react-chartjs-2';

const VisualStatistics = () => {

    const { transactions } = useSelector(state => state.order)

    const fulfilledTransactions = transactions.filter(transaction => transaction.isDelivered === true)

    const pendingTransactions = transactions.filter(transaction => transaction.isDelivered === false)

    console.log(fulfilledTransactions)

  const data = {
  labels: ['Fulfilled transactions', 'Unfulfilled transactions'],
  datasets: [
    {
      label: '# of Votes',
      data: [fulfilledTransactions.length, pendingTransactions.length],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        
       
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        
        
      ],
      borderWidth: 1,
    },
  ],
};



  return (
    <>
    
    <div class="grid grid-cols-8">
                      <div class="xl:col-start-3 xl:col-span-4 lg:p-10 lg:pb-0 md:col-start-2 md:col-span-6  col-start-2 col-span-6 p-5 " >
                        <Doughnut data={data} />
                        {/* orders received / orders fulfilled */}
                      </div>
                      
                      
                    </div>
    </>
    
  )
}

export default VisualStatistics