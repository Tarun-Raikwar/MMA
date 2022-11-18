let type = document.querySelector('#box1 p');
let text = type.innerHTML;
type.innerHTML = "";
let i = 0;
let isIncrease = 1;
function typewriter(){
    if(i<text.length){
        type.innerHTML += text[i];
        i++;
        setTimeout(typewriter, 120);
    }
}

typewriter();

let contact = document.getElementsByClassName('contact');
console.log(contact);
for(let i=0; i<contact.length; i++){
    contact[i].addEventListener('click', ()=>{
        document.getElementById('Contact_page').scrollIntoView();
    })
}

let client = document.querySelectorAll('#companies div');
for(let i=0; i<client.length; i++){
    client[i].addEventListener('mouseover', ()=>{
        client[i].querySelector('img').style.width = '80%';
    })
    client[i].addEventListener('mouseout', ()=>{
        client[i].querySelector('img').style.width = '60%';
    })
}

// **************** side bar *******************

let dropdown = document.getElementById('dropdown');

dropdown.addEventListener('click', ()=>{
    let sidebar = document.getElementById('sidebar');
    if(sidebar.style.display == 'block'){
        sidebar.style.display = 'none';
    }
    else{
        sidebar.style.display = 'block';
    }
})


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