const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.innerText = ''
    messageTwo.innerText= ''
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(search.value)}}`).then((response) => {
        response.json().then((data)=>{
            
            if(!data){
                console.log('error fetching')
            }
            else{console.log(data)
                if (!data.error){
                    const {address, forecast, location, message} = data
                    messageOne.innerText = ` ${location}, ${address} `
                    messageTwo.innerText = message
                }
                else if (data.error){
                    messageOne.innerText = `Error: ${data.error}`
                }
                else{
                    messageOne.innerText = "default error"
                }
            }
        })
    })
})
