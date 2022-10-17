let contact = document.getElementsByClassName('contact');
console.log(contact);
for(let i=0; i<contact.length; i++){
    contact[i].addEventListener('click', ()=>{
        document.getElementById('contact_info').scrollIntoView();
    })
}


let submit = document.getElementById('submit');

submit.addEventListener('click', (e)=>{

    e.preventDefault();
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let message = document.getElementById('message');

    fetch('/customer_query', {
        method: "post",
    
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            phone: phone.value,
            message: message.value
        }),

        headers: {
            'content-type': "application/json"
        }
    }).then((res)=>{
        return res.json();
    })
    .then(data =>{
        console.log(data);
        if(data[0] == 0) name.style.borderColor = "red";;
        if(data[1] == 0) phone.style.borderColor = "red";
        if(data[2] == 0) email.style.borderColor = "red";
        if(data[3] == 0) message.style.borderColor = "red";
    })

    name.value = "";
    phone.value = "";
    message.value = "";
    email.value = "";
})