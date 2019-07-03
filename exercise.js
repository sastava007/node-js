
// Using Callback nesting
getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});

// Using Async Await approach with promises
async function notifyCustomer()
{
  const customer=await getCustomer(1);
  console.log('Customer: ', customer);
  if(customer.isGold)
  {
    const movies=await getTopMovies();
    console.log('Top movies: ', movies);
    const email =await sendEmail(customer.email,movies);
    console.log('Email sent...');
  }
}
notifyCustomer();


function getCustomer(id) {
  // do some async work
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('Reading customer from database');
      resolve({
        id: 1, name: 'Mosh Hamedani', isGold: true, email: 'email' 
      });
      reject(new Error('Error found while eading user from database'));
    }, 3000); 
  });   
}



function getTopMovies() {
  // do some async work
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
      reject(new Error('Top Movies not found'));
    }, 3000);
  });  
}

function sendEmail(email, movies) {
  // do some async work
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve();
    }, 3000);
  });  
}