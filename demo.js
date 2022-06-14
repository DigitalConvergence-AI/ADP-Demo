
import fetch from 'cross-fetch';
//Author: Prabhurajan Govindasamy
//Date of Creation: June 13 2022 @ 4:50PM

export const ADPDemo = () =>  (
    // GET
    // This is to GET request using the native  javascript fetch
   fetch('https://interview.adpeai.com/api/v2/get-task')
    .then(res => res.json())
    .then(json => {
        const ID = json.id;
        console.log('ID: '+ ID);
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;
        const input = json.transactions.slice();
    
        //This will filter the data for previous year
        const filteredLastYear = input.filter(x => 
            new Date(x.timeStamp).getFullYear() == previousYear
        );

        const filteredLastYearQ = filteredLastYear.slice();
        //  find the highest sum of total of a specific employee.
        const result = Object.values(filteredLastYearQ
            .reduce((m, n) => (m[n.employee.id]
            ? (m[n.employee.id].amount += n.amount)
            : (m[n.employee.id] = { ...n }), m), {}));

        // get the highest amount of the employee id
         const reduceQ = result.reduce((prev, current) => (+prev.amount > +current.amount) 
            ? prev : current);

        // get all the transactions of the employee(who has highest sum of amount in total) in the previous year
        const allTrnx = filteredLastYearQ.filter
                (x => x.employee.id === reduceQ.employee.id);
    
        console.log('Get all the transactions of last years top earner:');
        console.log(allTrnx);
        // filter for alpha record 
        const filtered = allTrnx
        .reduce((result, {type, transactionID}) => 
        [...result, ...type === 'alpha' ? [transactionID] : []], []);
      
        PostMethod(filtered, ID);
    })
);

const PostMethod = (filtered, ID) => {
   //POST
   let bodyText =  {
    "id": ID,
    "result": filtered
  };

    //console.log(JSON.stringify(bodyText));

    const url = 'https://interview.adpeai.com/api/v2/submit-task';
      const requestOptions = {
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(bodyText)
      
    };
   fetch(url, requestOptions)
   .then(response => {
    console.log('response.status: ', response.status); 
    //console.log(response);

  })
  .catch(err => {
    console.log(err);
  })

};



