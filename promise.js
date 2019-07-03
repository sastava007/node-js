console.log('Before');

getUser(3)
    .then(user=>{
        console.log(`Github Username: ${user.name}`)
        return getRepositries(user.name)   
    })
    .then(repos=>{
        console.log(repos)
        return displayCommits(repos[0])
       })
    .then(commits=>{
        console.log(commits);
    })
    .catch(err=>console.log(err.message));


console.log('after');

function getUser(id)
{
    return new Promise((resolve,reject)=>{
        // Do some Async work 
        setTimeout(()=>{
            console.log('Acessing the database...');
            resolve({"id":id,"name":"Mosh"});
            reject(new Error('Error ocuured accessing the database'));
        },2000);

    });    
}

function getRepositries(username)
{
    return new Promise((resolve,reject)=>{
        // Do some async work
        setTimeout((username)=>{
            console.log('Collecting repositries...');
            resolve(['repo1','repo2','repo3']);
            reject(new Error('Error occured while connecting to Github'));
        },2000)

    });    
}

function displayCommits(repo)
{
    return new Promise((resolve,reject)=>{
        // Do some async work
        setTimeout(()=>{
        console.log(`Commit SSH code for ${repo} are: `);
        resolve(['#jdjg$jhg', 'duidua^bj@' , 'qxf&h#g@1']);
        reject(new Error('SSH code not available'));
        },1000);
    });   
}